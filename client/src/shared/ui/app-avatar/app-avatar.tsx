import * as Avatar from "@radix-ui/react-avatar";
import cl from "./app-avatar.module.scss";
import Image from "next/image";

interface AppAvatarProps {
  src?: string;
  alt: string;
}

export const AppAvatar = ({ alt, src }: AppAvatarProps) => {
  return (
    <Avatar.Root className={cl.root}>
      <Avatar.Image className={cl.image} src={src} alt={alt} />
      <Avatar.Fallback className={cl.fallback} delayMs={600}>
        <Image
          className={cl.image}
          src={"/images/avatar/avatar-placeholder.png"}
          alt={alt}
          width={1080}
          height={1080}
        />
      </Avatar.Fallback>
    </Avatar.Root>
  );
};
