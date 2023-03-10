// Wouter exposes everything as hooks or components, but sometimes we need a history wrapper for a plain JavaScript function.
// This extension is using some of Wouter's own code to achieve this.

/*const relativePath = (base = "", path = location.pathname) =>
    !path.toLowerCase().indexOf(base.toLowerCase())
        ? path.slice(base.length) || "/"
        : "~" + path;*/
/*const absolutePath = (to, base = "") => to[0] === "~" ? to.slice(1) : base + to;*/

const eventPushState = "pushState";
const eventReplaceState = "replaceState";

const navigation = (to, { replace = false } = {}) => history[replace ? eventReplaceState : eventPushState](null, "", to);

export const WOUTER = {
    navigation,
};