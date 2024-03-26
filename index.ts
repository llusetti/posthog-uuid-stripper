import { PluginEvent, PluginInput, PluginMeta } from "@posthog/plugin-scaffold";

function stripUUIDs(url: string): string {
  try {
    return url.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, '{ID}');    
  } catch (err) {
    throw `Unable to normalize invalid URL: "${url}"`;
  }
}

export function processEvent(
  event: PluginEvent,
  meta: PluginMeta<PluginInput>
) {
  meta
  console.debug(event, event.properties);

  const $current_url = event?.properties?.$current_url;
  if (event?.properties && $current_url) {
    const normalized_url = stripUUIDs($current_url);
    event.properties.$current_url = normalized_url;   

    
    console.info(`event.$current_url: "${$current_url}" normalized to "${normalized_url}"`);
  }

  return event;
}
