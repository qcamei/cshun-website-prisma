module.exports = {
	/**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
	apps: [
		// First application
		{
			name: 'API',
			npm: 'start',
			env: {
				COMMON_VARIABLE: 'true'
			},
			env_production: {
				NODE_ENV: 'production'
			}
		}
	],
	/**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
	deploy: {
		production: {
			user: 'wsq',
			host: 'tx',
			ref: 'origin/master',
			repo: 'https://github.com/ymz-studio/cshun-website-prisma.git',
			path: '/home/wsq/cshun-website-prisma',
			'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
		}
	}
};
