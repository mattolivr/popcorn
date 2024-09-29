import { ReactNode } from "react";
import { FaImdb } from "react-icons/fa";
import { FaFacebook, FaImage, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { tv } from "tailwind-variants";
import Button, { type ButtonProps } from "../../../components/button/Button";
import Card from "../../../components/card/Card";
import Divider from "../../../components/Divider";
import { type WatchProvider as WatchProviderType } from "../../../entites/tmdb/tmdb.provider";
import mediaService from "../../../services/media.service";
import { useMediaLayoutContext } from "./context";

export function MediaLayoutWatchProviders(): ReactNode {
  const { media } = useMediaLayoutContext();
  return (
    media?.providers &&
    media.providers.length > 0 && (
      <>
        <Divider>Assista em:</Divider>
        {media.providers.map((provider, index) => (
          <WatchProvider key={index} provider={provider} />
        ))}
      </>
    )
  );
}

export function MediaLayoutMobileWatchProviders(): ReactNode {
  const { media } = useMediaLayoutContext();
  return (
    media?.providers &&
    media.providers.length > 0 && (
      <Card
        title={<Card.Title text="Assista em" />}
        className={mediaLayoutWatchProvidersStyle({
          className: "flex gap-2 shadow-none lg:hidden",
        })}
      >
        {media.providers.map((provider, index) => (
          <WatchProvider key={index} provider={provider} />
        ))}
      </Card>
    )
  );
}

export function MediaLayoutExternalLinks(): ReactNode {
  const { media } = useMediaLayoutContext();

  if (!media?.externalIds) {
    return;
  }

  const { imdbId, facebookId, instagramId, twitterId } = media.externalIds;
  const iconStyle = "text-3xl sm:text-4xl text-white hover:text-gray-300";
  const links: ButtonProps[] = [];

  if (imdbId) {
    links.push({
      icon: <Button.Icon icon={FaImdb} className={iconStyle} />,
      to: `https://www.imdb.com/title/${imdbId}`,
    });
  }

  if (facebookId) {
    links.push({
      icon: <Button.Icon icon={FaFacebook} className={iconStyle} />,
      to: `https://www.facebook.com/${facebookId}`,
    });
  }

  if (instagramId) {
    links.push({
      icon: <Button.Icon icon={FaInstagram} className={iconStyle} />,
      to: `https://www.instagram.com/${instagramId}`,
    });
  }

  if (twitterId) {
    links.push({
      icon: <Button.Icon icon={FaXTwitter} className={iconStyle} />,
      to: `https://www.x.com/${twitterId}`,
    });
  }

  return (
    <div className="flex gap-2">
      {links.map((link, index) => (
        <a key={index} target="_blank" rel="noreferrer" href={link.to}>
          <Button color="clear" className="p-0" icon={link.icon} />
        </a>
      ))}
    </div>
  );
}

function WatchProvider({ provider }: { provider: WatchProviderType }): ReactNode {
  const { media } = useMediaLayoutContext();
  return (
    <Button color="clear" className="h-16 justify-start px-2">
      <a
        href={media?.providersLink}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-start gap-2 overflow-hidden"
      >
        <div className="flex h-10 w-10 shrink-0 grow-0 items-center justify-center rounded-md bg-gray-400">
          <img
            src={mediaService.getImage(provider.logo_path)}
            className="h-10 w-10 rounded-md"
            onError={(event) => {
              event.currentTarget.parentNode?.removeChild(event.currentTarget);
            }}
          />
          <FaImage className="text-xl text-gray-100" />
        </div>
        <div className="flex flex-col overflow-hidden text-start leading-5">
          <span className="truncate font-semibold">{provider.provider_name}</span>
          <span>{provider.type}</span>
        </div>
      </a>
    </Button>
  );
}

const mediaLayoutWatchProvidersStyle = tv({
  base: "flex flex-col gap-1",
});
