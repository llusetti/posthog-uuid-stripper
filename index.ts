import { PluginEvent, PluginInput, PluginMeta } from "@posthog/plugin-scaffold";

function stripUUIDsFromString(value: string): string {  
    return value.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g, '#id');     
}

export function processEvent(
  event: PluginEvent,
  meta: PluginMeta<PluginInput>
) {  
  const $current_url = event?.properties?.$current_url;
  const $pathname = event?.properties?.$pathname;
  if (event?.properties && $current_url) {
    const normalized_url = stripUUIDsFromString($current_url);
    event.properties.$current_url = normalized_url;           
  }

  if (event?.properties && $pathname) {
    //costruiamo url farlocco per sistemarlo
    const urlObj = new URL('http://localhost' + $pathname);    
    const normalized_path = stripUUIDsFromString(urlObj.pathname);
    event.properties.$pathname = normalized_path;           
  }

  return event;
}
