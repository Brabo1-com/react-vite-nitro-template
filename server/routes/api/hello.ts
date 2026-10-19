// Brabo integration code, 2026-10-19; Apache-2.0.
// Implements the observed greeting contract using the public Nitro API.
import { defineHandler } from "nitro";

const greeting = "Hello Nitro!";
export default defineHandler(() => ({ message: greeting }));
