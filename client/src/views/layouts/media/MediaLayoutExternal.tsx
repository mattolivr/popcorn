import { FaImdb } from "react-icons/fa";
import { FaFacebook, FaImage, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { tv } from "tailwind-variants";
import { getImage } from "../../../adapters/tmdb";
import Button, { type ButtonProps } from "../../../components/button/Button";
import Card from "../../../components/card/Card";
import Divider from "../../../components/Divider";
import { type WatchProvider as WatchProviderType } from "../../../entites/tmdb.provider";
import { useMediaLayoutContext } from "./context";

export function MediaLayoutWatchProviders(): React.ReactNode {
  const { media } = useMediaLayoutContext();
  if (media?.providers.length) {
    return (
      <div className={mediaLayoutWatchProvidersStyle()}>
        <Divider>Assista em:</Divider>
        {media.providers.map((provider, index) => (
          <WatchProvider key={index} provider={provider} />
        ))}
      </div>
    );
  }
}

export function MediaLayoutMobileWatchProviders(): React.ReactNode {
  const { media } = useMediaLayoutContext();
  if (media?.providers.length) {
    return (
      <Card
        title={<Card.Title text="Assista em" />}
        className={mediaLayoutWatchProvidersStyle({
          className: "flex gap-2 shadow-none lg:hidden",
        })}
      >
        {media.providers.map((provider, index) => (
          <WatchProvider key={index} provider={provider} mobile />
        ))}
      </Card>
    );
  }
}

export function MediaLayoutExternalLinks(): React.ReactNode {
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
          <Button color="blank" className="p-0" icon={link.icon} />
        </a>
      ))}
    </div>
  );
}

function WatchProvider({
  provider,
  mobile,
}: {
  provider: WatchProviderType;
  mobile?: boolean;
}): React.ReactNode {
  const { media } = useMediaLayoutContext();
  return (
    <a href={media?.providersLink} target="_blank" rel="noreferrer">
      <WatchProviderContainer mobile={mobile}>
        <div className="relative flex h-12 w-12 items-center justify-center rounded-md bg-gray-400">
          <img
            src={getImage(provider.logo_path)}
            className="absolute h-full w-full rounded-md"
            onError={(event) => {
              event.currentTarget.parentNode?.removeChild(event.currentTarget);
            }}
          />
          <FaImage className="text-xl text-gray-100" />
        </div>
        <div className="flex flex-col justify-center leading-5">
          <span className="font-semibold">{provider.provider_name}</span>
          <span>{provider.type}</span>
        </div>
      </WatchProviderContainer>
    </a>
  );
}

function WatchProviderContainer({
  children,
  mobile,
}: {
  children: React.ReactNode;
  mobile?: boolean;
}): React.ReactNode {
  if (mobile) {
    return <div className="flex flex-row gap-2 rounded-md active:bg-gray-200">{children}</div>;
  }
  return (
    <Card className="flex-row gap-2 rounded-xl border-2 border-gray-100 hover:bg-gray-100">
      {children}
    </Card>
  );
}

const mediaLayoutWatchProvidersStyle = tv({
  base: "flex flex-col gap-1",
});
