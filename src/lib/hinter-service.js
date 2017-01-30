// @flow

import settingsClient from "./settings-client";
import Hinter from "./hinter";
import HintsView from "./hint-view";
import { recieve } from "./message-passing";

import type { RemoveHints, HitHint } from "./hinter-client";

(async () => {
  let hinter: Hinter;

  const settings = await settingsClient.get();
  hinter = new Hinter(settings.hints);
  new HintsView(hinter, settings.css);

  settingsClient.subscribe((settings) => {
    hinter = new Hinter(settings.hints);
    new HintsView(hinter, settings.css);
  });

  recieve("AttachHints", () => hinter.attachHints());
  recieve("RemoveHints", ({ options }: RemoveHints) => hinter.removeHints(options));
  recieve("HitHint", ({ key }: HitHint) => hinter.hitHint(key));
})();
