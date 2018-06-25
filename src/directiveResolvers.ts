import { AuthError, getUserId, Context } from './utils';

export default {
	async hasRole(next, source, { role }, ctx: Context) {
		const user = await ctx.db.query.user({ where: { id: getUserId(ctx) } }, `{role}`);
		role.forEach((element) => {
			if (!user.role.includes(element)) {
				throw new AuthError();
			}
		});
		return next();
	},
	async isAuthenticated(next, source, args, ctx: Context) {
		const user = await ctx.db.query.user({ where: { id: getUserId(ctx) } });
		if (user) return next();
		else throw new AuthError();
	}
};
