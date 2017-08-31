// URL
// const originDomain = 'http://207.154.237.9';
let originDomain = 'https://skins4real.com';
if (process.env.NODE_ENV=='dev') {
	const port = process.env.SKINS_PORT;
  originDomain = 'http://localhost:'+port;
}
export { originDomain }

const url = originDomain+'/dashboard/api/v1';

export const authUrl = originDomain+'/token_auth';

export const headUrl = url+'/header'; // get всякая хуйня из шапки (баланс юзера, название интеграции и тд
export const steamStatusUrl = originDomain + '/api/v2ru/is-steam-rip'; //steam status url

export const debitRequestUrl = url+'/debit/request'; // post {amount:123, currency:RUB} запросить выплату 
export const debitListUrl = url+'/debit/list'; // post {amount:123, currency:RUB} запросить выплату 

export const depositListUrl = url+'/deposit/list'; // get список транзакций
export const depositUrl = url+'/deposit'; // get одна транзакция

export const statUrl = url+'/statistics/by-currency'; // get статистика для страницы статистика
export const graphicsUrl = url+'/statistics/by-currency-and-date'; // get статистика для страницы графики

export const feedUrl = url+'/send-feedback'; // {'message':'tvari ebanie'}

export const reportsUrl = url + '/deposit/reports'; //statistics reports list
export const reportCreateUrl = url + '/deposit/create_report'; //deposit create report url
export const reportFilePrefix = originDomain + '/reports/';


// titles
// {path: , title: }

export const titles = {
	'/login' : 'Авторизация',
	'/' : 'Статистика',
	'/graphics' : 'Графики',
	'/transactions' : 'Транзакции',
	'/contacts' : 'контакты',
	'/feedback' : 'поддержка',
	'/faq' : 'FAQ'
}
