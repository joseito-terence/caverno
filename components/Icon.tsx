import {
  Host,
  Icon as EuiIcon,
  type IconProps,
} from "@expo/ui/jetpack-compose";

export function Icon(props: IconProps) {
  return (
    <Host matchContents>
      <EuiIcon {...props} />
    </Host>
  );
}
