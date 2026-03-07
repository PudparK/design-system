import { Pressable, Text, View } from "react-native";

import { DetailRow } from "@/src/design-system/components/DetailRow";
import type { PublicUser } from "@/src/domain/user/types";
import type { UserDetailsStyles } from "@/src/features/user/screens/user-details.styles";

type UserDetailsContentProps = {
  user: PublicUser;
  location: string;
  modes: string;
  languages: string;
  focus: string;
  stylesText: string;
  mappedPrompts: string[];
  styles: UserDetailsStyles;
};

export function UserDetailsContent({
  user,
  location,
  modes,
  languages,
  focus,
  stylesText,
  mappedPrompts,
  styles,
}: UserDetailsContentProps) {
  const promptsValue = mappedPrompts.map((prompt, index) => `${index + 1}. ${prompt}`).join("\n");

  return (
    <>
      {!!location ? (
        <DetailRow
          label="Location"
          value={location}
          containerStyle={styles.block}
          labelStyle={styles.sectionLabel}
          valueStyle={styles.detailValue}
        />
      ) : null}
      {!!modes ? (
        <DetailRow
          label="Mode"
          value={modes}
          containerStyle={styles.block}
          labelStyle={styles.sectionLabel}
          valueStyle={styles.detailValue}
        />
      ) : null}
      {!!languages ? (
        <DetailRow
          label="Languages"
          value={languages}
          containerStyle={styles.block}
          labelStyle={styles.sectionLabel}
          valueStyle={styles.detailValue}
        />
      ) : null}
      {!!focus ? (
        <DetailRow
          label="Focus"
          value={focus}
          containerStyle={styles.block}
          labelStyle={styles.sectionLabel}
          valueStyle={styles.detailValue}
        />
      ) : null}
      {!!stylesText ? (
        <DetailRow
          label="Styles"
          value={stylesText}
          containerStyle={styles.block}
          labelStyle={styles.sectionLabel}
          valueStyle={styles.detailValue}
        />
      ) : null}
      {!!user.bioShort ? (
        <DetailRow
          label="About"
          value={user.bioShort}
          containerStyle={styles.block}
          labelStyle={styles.sectionLabel}
          valueStyle={styles.detailValueRelaxed}
        />
      ) : null}
      {mappedPrompts.length > 0 ? (
        <DetailRow
          label="Intake Prompts"
          value={promptsValue}
          containerStyle={styles.block}
          labelStyle={styles.sectionLabel}
          valueStyle={styles.detailValueRelaxed}
        />
      ) : null}
    </>
  );
}

type UserDetailsCtaBarProps = {
  bookingUrl?: string | null;
  contactEmail?: string | null;
  styles: UserDetailsStyles;
  onPressBook: (bookingUrl: string) => void;
  onPressContact: (contactEmail: string) => void;
};

export function UserDetailsCtaBar({
  bookingUrl,
  contactEmail,
  styles,
  onPressBook,
  onPressContact,
}: UserDetailsCtaBarProps) {
  return (
    <View style={styles.ctaBar}>
      {bookingUrl ? (
        <Pressable style={[styles.ctaButton, styles.primaryCta]} onPress={() => onPressBook(bookingUrl)}>
          <Text style={styles.primaryCtaText}>Book</Text>
        </Pressable>
      ) : null}
      {contactEmail ? (
        <Pressable
          style={[styles.ctaButton, styles.secondaryCta]}
          onPress={() => onPressContact(contactEmail)}
        >
          <Text style={styles.secondaryCtaText}>Contact</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
