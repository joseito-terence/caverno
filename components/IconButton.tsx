import { Host, FilledIconButton } from "@expo/ui/jetpack-compose";
import { testID } from "@expo/ui/jetpack-compose/modifiers";
import type { ReactNode } from "react";
import { useResolveClassNames } from "uniwind";

interface Props {
  children: ReactNode;
  onPress?: () => void;
  testID?: string;
  enabled?: boolean;
}

export function IconButton({ children, onPress, testID: tid, enabled }: Props) {
  const styles = useResolveClassNames("bg-gray-800/95")
  return (
    <Host matchContents>
      <FilledIconButton
        onClick={onPress}
        enabled={enabled ?? true}
        colors={{ containerColor: styles.backgroundColor }}
        modifiers={tid ? [testID(tid)] : undefined}
      >
        {children}
      </FilledIconButton>
    </Host>
  );
}
