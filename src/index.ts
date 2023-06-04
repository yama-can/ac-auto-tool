import puppeteer from "puppeteer";
import login from "./login";

(async () => {
	const browser = await puppeteer.launch({ headless: 'new' });
	process.exit();
})();
