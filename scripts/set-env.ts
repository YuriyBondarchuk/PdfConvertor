const fs = require('fs');
const dotenv = require('dotenv');

const isProduction: boolean = process.env['NODE_ENV'] === 'production';

dotenv.config();

const targetPath = './src/environments/environment.ts';

const envConfigFile: string = `
export const environment = {
	production: ${isProduction},
	apiUrl: '${process.env['API_URL']}',
	apiKey: '${process.env['API_KEY']}',
};
`;

fs.writeFile(targetPath, envConfigFile, function (err: any) {
	if (err) {
		console.log(err);
	} else {
		console.log(`Environment variables are written to ${targetPath}`);
	}
});
