import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";

import { IconSymbol } from "@/src/design-system/components/ui/icon-symbol";
import { DetailRow } from "@/src/design-system/components/DetailRow";
import type { PublicUser } from "@/src/domain/user/types";
import { getPhotoUri } from "@/src/features/user/model/user.selectors";
import type { DiscoverStyles } from "@/src/features/user/screens/discover.styles";

type ThemePalette = {
  surface: string;
  onPrimary: string;
};

type ProfileCardProps = {
  user: PublicUser;
  canEdit: boolean;
  styles: DiscoverStyles;
  theme: ThemePalette;
  onOpenDetails: (userId: string) => void;
  onEdit: (userId: string, photoUri: string | null) => void;
};

function ProfileCardComponent({
  user,
  canEdit,
  styles,
  theme,
  onOpenDetails,
  onEdit,
}: ProfileCardProps) {
  const offsetYRef = useRef(0);
  const viewportHeightRef = useRef(0);
  const contentHeightRef = useRef(0);

  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  const updateFadeState = useCallback(
    (offsetY: number, contentHeight: number, viewportHeight: number) => {
      const canScroll = contentHeight > viewportHeight + 1;
      const atTop = offsetY <= 2;
      const atBottom = offsetY + viewportHeight >= contentHeight - 2;

      setShowTopFade(canScroll && !atTop);
      setShowBottomFade(canScroll && !atBottom);
    },
    [],
  );

  const handleDetailsScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
      offsetYRef.current = contentOffset.y;
      contentHeightRef.current = contentSize.height;
      viewportHeightRef.current = layoutMeasurement.height;
      updateFadeState(offsetYRef.current, contentHeightRef.current, viewportHeightRef.current);
    },
    [updateFadeState],
  );

  const handleDetailsLayout = useCallback(
    (event: LayoutChangeEvent) => {
      viewportHeightRef.current = event.nativeEvent.layout.height;
      updateFadeState(offsetYRef.current, contentHeightRef.current, viewportHeightRef.current);
    },
    [updateFadeState],
  );

  const handleDetailsContentSizeChange = useCallback(
    (_: number, contentHeight: number) => {
      contentHeightRef.current = contentHeight;
      updateFadeState(offsetYRef.current, contentHeightRef.current, viewportHeightRef.current);
    },
    [updateFadeState],
  );

  const photoUri = useMemo(() => getPhotoUri(user.photoUrl) ?? null, [user.photoUrl]);
  const location = useMemo(() => [user.city, user.state].filter(Boolean).join(", "), [user.city, user.state]);
  const modes = useMemo(
    () =>
      [user.telehealth ? "Telehealth" : null, user.inPerson ? "In person" : null]
        .filter(Boolean)
        .join(" · "),
    [user.inPerson, user.telehealth],
  );
  const languages = useMemo(() => user.languages.join(", "), [user.languages]);
  const focusAreas = useMemo(() => user.focusAreas.join(", "), [user.focusAreas]);
  const therapyStyles = useMemo(() => user.therapyStyles.join(", "), [user.therapyStyles]);

  const imageSource = useMemo(() => (photoUri ? { uri: photoUri } : null), [photoUri]);
  const topFadeStyle = useMemo(() => [styles.edgeFade, styles.edgeFadeTop], [styles]);
  const bottomFadeStyle = useMemo(() => [styles.edgeFade, styles.edgeFadeBottom], [styles]);
  const photoFallbackStyle = useMemo(() => [styles.photo, styles.photoFallback], [styles]);

  const handleOpenDetailsPress = useCallback(() => {
    onOpenDetails(user.id);
  }, [onOpenDetails, user.id]);

  const handleEditPress = useCallback(() => {
    onEdit(user.id, photoUri);
  }, [onEdit, photoUri, user.id]);

  return (
    <Pressable style={styles.cardContent} onPress={handleOpenDetailsPress}>
      <View style={styles.detailsViewport}>
        <ScrollView
          style={styles.cardScroll}
          contentContainerStyle={styles.cardBody}
          nestedScrollEnabled
          directionalLockEnabled
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={handleDetailsScroll}
          onLayout={handleDetailsLayout}
          onContentSizeChange={handleDetailsContentSizeChange}
        >
          {imageSource ? (
            <Image source={imageSource} style={styles.photo} contentFit="cover" contentPosition="top" />
          ) : (
            <View style={photoFallbackStyle} />
          )}
          {canEdit && !user.publishedAt ? (
            <View style={styles.unpublishedBadge}>
              <Text style={styles.unpublishedBadgeText}>Unpublished</Text>
            </View>
          ) : null}
          <Text style={styles.name}>{user.displayName}</Text>
          <Text style={styles.tagline}>{user.tagline ?? "No tagline yet."}</Text>

          {!!location && (
            <DetailRow
              label="Location"
              value={location}
              containerStyle={styles.block}
              labelStyle={styles.sectionLabel}
              valueStyle={styles.detailValue}
            />
          )}
          {!!modes && (
            <DetailRow
              label="Mode"
              value={modes}
              containerStyle={styles.block}
              labelStyle={styles.sectionLabel}
              valueStyle={styles.detailValue}
            />
          )}
          {!!languages && (
            <DetailRow
              label="Languages"
              value={languages}
              containerStyle={styles.block}
              labelStyle={styles.sectionLabel}
              valueStyle={styles.detailValue}
            />
          )}
          {!!focusAreas && (
            <DetailRow
              label="Focus"
              value={focusAreas}
              containerStyle={styles.block}
              labelStyle={styles.sectionLabel}
              valueStyle={styles.detailValue}
            />
          )}
          {!!therapyStyles && (
            <DetailRow
              label="Styles"
              value={therapyStyles}
              containerStyle={styles.block}
              labelStyle={styles.sectionLabel}
              valueStyle={styles.detailValue}
            />
          )}
          {!!user.bioShort && (
            <View style={styles.block}>
              <Text style={styles.sectionLabel}>About</Text>
              <Text style={styles.bio}>{user.bioShort}</Text>
            </View>
          )}
          {!!user.contactEmail && (
            <DetailRow
              label="Email"
              value={user.contactEmail}
              containerStyle={styles.block}
              labelStyle={styles.sectionLabel}
              valueStyle={styles.detailValue}
            />
          )}
          {!!user.websiteUrl && (
            <DetailRow
              label="Website"
              value={user.websiteUrl}
              containerStyle={styles.block}
              labelStyle={styles.sectionLabel}
              valueStyle={styles.detailValue}
            />
          )}
          {!!user.bookingUrl && (
            <DetailRow
              label="Booking"
              value={user.bookingUrl}
              containerStyle={styles.block}
              labelStyle={styles.sectionLabel}
              valueStyle={styles.detailValue}
            />
          )}
        </ScrollView>

        {showTopFade ? (
          <LinearGradient
            colors={[theme.surface, theme.surface, `${theme.surface}00`]}
            locations={[0, 0.18, 1]}
            pointerEvents="none"
            style={topFadeStyle}
          />
        ) : null}

        {showBottomFade ? (
          <LinearGradient
            colors={[`${theme.surface}00`, theme.surface]}
            pointerEvents="none"
            style={bottomFadeStyle}
          />
        ) : null}

        {canEdit ? (
          <Pressable
            style={styles.floatingEditButton}
            onPress={handleEditPress}
          >
            <IconSymbol name="square.and.pencil" size={20} color={theme.onPrimary} />
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}

export const ProfileCard = memo(ProfileCardComponent);
ProfileCard.displayName = "ProfileCard";
