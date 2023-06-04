import { Page } from 'puppeteer'
import readline from 'readline-sync'
import colors from 'colors'

export default async function (page: Page, login?: { username: string, password: string }): Promise<void> {
	return new Promise<void>(async (resolve) => {
		let data: { username: string, password: string } = { 'username': '', 'password': '' };
		if (login == undefined) {
			console.log(colors.green('AtCoder Auto Tool'));
			console.log(colors.yellow('You must be logged in.'));
			data.username = readline.question('Username: ');
			data.password = readline.question('Password: ', { hideEchoBack: true });
		} else {
			data = login;
		}
		page.on('domcontentloaded', async () => {
			switch (page.url()) {
				case 'https://atcoder.jp/login':
					await page.type('#username', data.username);
					await page.type('#password', data.password);
					await page.click('#submit');
				case 'https://atcoder.jp/login?continue=https%3A%2F%2Fatcoder.jp%2Fhome':
					const alert = await page.$('.alert')
					if (alert != null) {
						console.log(colors.yellow('Incorrect username or password. Try again.'));
						data.username = readline.question('Username: ');
						data.password = readline.question('Password: ', { hideEchoBack: true });
						await page.goto('https://atcoder.jp/login');
					} else {
						console.log(colors.green('login successful.'));
						resolve();
					}
			}
		})
		await page.goto('https://atcoder.jp/login');
	});
}
