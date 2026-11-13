import type { ReactNode } from "react";

// The home server's two diagrams: what runs where, and how traffic reaches it. Real text in real
// lists rather than pictures, so they reflow on a phone and read in order to a screen reader.
// Frames sit inside frames, each named on its top edge like a panel on a wiring schematic: a thick
// ink line for hardware, a thin lighter one for what runs on it (still 5.8:1 on the paper, above the
// 3:1 a diagram's lines need). Thickness, not shade alone, so the two are easy to tell apart. Addresses, ports, and names that would help
// an attacker are left out on purpose

const LABEL = "font-sans text-base font-semibold leading-[1.3] text-quiet-ink";
const DETAIL = "text-base leading-[1.5] text-quiet-muted text-pretty";

// Where a frame's detail moves up beside its name: from sm for the wide frames, from lg for the three
// side by side, which are narrow until then
const INLINE_FROM = {
  sm: { inName: "hidden sm:inline", inFrame: "sm:hidden" },
  lg: { inName: "hidden lg:inline", inFrame: "lg:hidden" },
};

// A frame named on its top edge. The name's paper background breaks the line behind it. The detail
// joins the name there where it fits on one line, and is the frame's first line where it doesn't,
// as a name that wraps would run into the border
function Frame({ name, detail, hardware, inlineFrom = "sm", className = "", children }: {
  name: string, detail?: string, hardware?: boolean, inlineFrom?: keyof typeof INLINE_FROM, className?: string, children: ReactNode,
}) {
  const place = INLINE_FROM[inlineFrom];
  return (
    <div className={`relative px-4 pb-4 pt-6 sm:px-5 ${hardware ? "border-2 border-quiet-ink" : "border border-quiet-muted"} ${className}`}>
      <p className={`absolute -top-3 left-3 whitespace-nowrap bg-quiet-paper px-2 ${LABEL}`}>
        {name}
        {detail && <span className={`font-normal text-quiet-muted ${place.inName}`}> {detail}</span>}
      </p>
      {detail && <p className={`-mt-1 mb-2 ${place.inFrame} ${DETAIL}`}>{detail}</p>}
      {children}
    </div>
  );
}

// One app and what it's for, the app in ink and its job muted, as in the lists elsewhere
function App({ name, job }: { name: string, job: string }) {
  return (
    <li className="text-base leading-[1.5]">
      <span className="text-quiet-ink">{name}</span>
      <span className="text-quiet-muted">, {job}</span>
    </li>
  );
}

function SystemDiagram() {
  return (
    <Frame name="Dell OptiPlex 7060" detail="Intel Core i5-8600, 16 GB RAM" hardware className="pt-8">
      <Frame name="Proxmox" className="mt-5 sm:mt-2">
        <ul className="mt-5 grid gap-x-4 gap-y-7 sm:mt-3 md:grid-cols-3">
          <li>
            <Frame name="Router" detail="OpenWrt" inlineFrom="lg" className="h-full">
              <ul className="mt-1 flex flex-col gap-1">
                <App name="Firewall" job="between the home network and the server" />
                <App name="AdGuard Home" job="blocks ads and trackers on the network" />
                <App name="Tailscale" job="remote access" />
              </ul>
            </Frame>
          </li>
          <li>
            <Frame name="Storage" detail="OpenMediaVault" inlineFrom="lg" className="h-full">
              <p className={`mt-1 ${DETAIL}`}>Media and files, shared with the apps over NFS.</p>
            </Frame>
          </li>
          <li>
            <Frame name="Apps" detail="Docker, with Portainer" inlineFrom="lg" className="h-full">
              <ul className="mt-1 flex flex-col gap-1">
                <App name="Jellyfin" job="media" />
                <App name="Vaultwarden" job="passwords" />
                <App name="Mealie" job="recipes" />
                <App name="Calibre-Web" job="ebooks" />
                <App name="Caddy" job="reverse proxy" />
              </ul>
            </Frame>
          </li>
        </ul>
      </Frame>
      {/* The drives, along the bottom of the machine they're in */}
      <ul className="mt-5 grid gap-x-6 gap-y-1 border-t-2 border-quiet-ink pt-3 sm:grid-cols-2">
        <App name="SSD, 240 GB" job="the virtual machines" />
        <App name="Hard drive, 2 TB" job="media, storage, and backups" />
      </ul>
    </Frame>
  );
}

// The line into a stop from the one above it, drawn on the stop itself so the list holds only stops
const FROM_ABOVE = "before:absolute before:left-1/2 before:-top-6 before:h-6 before:border-l before:border-quiet-ink";

// One stop on the path: a box with its name and what it does, and anything that joins it there
function Stop({ name, children, joins, first, className = "" }: {
  name: string, children?: ReactNode, joins?: ReactNode, first?: boolean, className?: string,
}) {
  return (
    <li className={`relative border border-quiet-ink bg-quiet-paper px-4 py-3 ${first ? "" : FROM_ABOVE} ${className}`}>
      <p className={LABEL}>{name}</p>
      {children && <p className={`mt-1 ${DETAIL}`}>{children}</p>}
      {joins}
    </li>
  );
}

// Tailscale, the way in from outside. Dashed, as an encrypted link over the internet rather than a
// cable. It joins at the firewall: nested in the firewall's box on narrow screens, and beside it,
// joined by a dashed line, where there's room
function Tailscale() {
  return (
    <div className="dash-box mt-3 bg-quiet-paper px-3 py-2 lg:absolute lg:left-full lg:top-1/2 lg:mt-0 lg:ml-8 lg:w-52 lg:-translate-y-1/2 lg:before:absolute lg:before:right-full lg:before:top-1/2 lg:before:w-8 lg:before:dash-line">
      <p className={LABEL}>Tailscale</p>
      <p className={`mt-1 ${DETAIL}`}>The way in from outside: an encrypted link from trusted devices, anywhere.</p>
    </div>
  );
}

function NetworkDiagram() {
  return (
    <div className="mx-auto max-w-xl">
      <ol className="mx-auto flex max-w-md flex-col gap-6">
        <Stop name="Internet" first />
        <Stop name="Home router">The home network, and the way out to the internet.</Stop>
        <Stop name="OpenWrt firewall" joins={<Tailscale />}>
          Lets traffic out, and nothing in: no part of the server is reachable from the internet.
        </Stop>
      </ol>
      {/* The path forks into the three networks behind the firewall. From sm up, side by side: one
          line down, across, and into each, with no gap between the columns so each line lands on
          its box's centre (a sixth, a half, and five sixths across). On phones, too narrow for three
          columns, a tree: one line down the left, and a short branch into each box. The last box
          paints over the line below its branch, so the line stops there */}
      <div aria-hidden className="relative hidden h-8 sm:block">
        <span className="absolute left-1/2 top-0 h-4 border-l border-quiet-ink" />
        <span className="absolute left-[16.667%] right-[16.667%] top-4 border-t border-quiet-ink" />
        <span className="absolute left-[16.667%] top-4 h-4 border-l border-quiet-ink" />
        <span className="absolute left-1/2 top-4 h-4 border-l border-quiet-ink" />
        <span className="absolute right-[16.667%] top-4 h-4 border-l border-quiet-ink" />
      </div>
      <div aria-hidden className="ml-4 h-4 border-l border-quiet-ink sm:hidden" />
      <ul className="ml-4 flex flex-col gap-3 border-l border-quiet-ink pl-4 sm:ml-0 sm:grid sm:grid-cols-3 sm:gap-0 sm:border-l-0 sm:pl-0">
        <Stop name="LAN" first className="relative mx-0 px-4 before:absolute before:-left-4 before:top-6 before:w-4 before:border-t before:border-quiet-ink last:after:absolute last:after:-left-[18px] last:after:top-[25px] last:after:-bottom-px last:after:w-[3px] last:after:bg-quiet-paper sm:mx-2 sm:before:hidden sm:last:after:hidden">The apps and storage. Storage shares media with the apps over NFS.</Stop>
        <Stop name="VPN network" first className="relative mx-0 px-4 before:absolute before:-left-4 before:top-6 before:w-4 before:border-t before:border-quiet-ink last:after:absolute last:after:-left-[18px] last:after:top-[25px] last:after:-bottom-px last:after:w-[3px] last:after:bg-quiet-paper sm:mx-2 sm:before:hidden sm:last:after:hidden">Leaves only through an encrypted VPN tunnel. If the tunnel drops, it&apos;s cut off rather than exposed.</Stop>
        <Stop name="Guest network" first className="relative mx-0 px-4 before:absolute before:-left-4 before:top-6 before:w-4 before:border-t before:border-quiet-ink last:after:absolute last:after:-left-[18px] last:after:top-[25px] last:after:-bottom-px last:after:w-[3px] last:after:bg-quiet-paper sm:mx-2 sm:before:hidden sm:last:after:hidden">Internet only, cut off from everything else.</Stop>
      </ul>
    </div>
  );
}

// The diagrams' headings, the page's second level, sized like its other headings
const TITLE = "font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink";
// The key under each diagram, saying what its kinds of line mean
const KEY = "mt-3 text-sm leading-[1.45] text-quiet-muted";

export default function HomeServerDiagrams() {
  return (
    <div className="flex flex-col gap-14">
      <figure>
        <figcaption className="mb-6">
          <h2 className={TITLE}>What runs where</h2>
          <p className={`mt-2 max-w-[60ch] ${DETAIL}`}>One small PC runs Proxmox, which splits it into three virtual machines, each with one job.</p>
        </figcaption>
        <SystemDiagram />
        <p className={KEY}>Thick lines: hardware. Thin lines: software running on it.</p>
      </figure>
      <figure>
        <figcaption className="mb-6">
          <h2 className={TITLE}>How traffic reaches it</h2>
          <p className={`mt-2 max-w-[60ch] ${DETAIL}`}>From the internet down to the server&apos;s three networks, and the one way in from outside.</p>
        </figcaption>
        <NetworkDiagram />
        <p className={`text-center ${KEY}`}>Dashed line: an encrypted link over the internet, rather than a cable.</p>
      </figure>
    </div>
  );
}
