import SERVICES from "./embed-services";
import EmbedTool from "@editorjs/embed";

/**
 * Patch allows readonly mode until get https://github.com/4rw44z/editorJs-list/pull/1
 * https://github.com/4rw44z/editorJs-list/blob/master/src/index.js
 */
export default class EmbedToolPatch extends EmbedTool {
	/**
	 * Analyze provided config and make object with services to use
	 *
	 * @param {EmbedToolPatch} config - configuration of embed block element
	 */
	static prepare({ config = {} }) {
		const { services = {} } = config;

		let entries = Object.entries(SERVICES)

		const enabledServices = Object
			.entries(services)
			.filter(([key, value]) => {
				return typeof value === 'boolean' && value === true;
			})
			.map(([ key ]) => key);

		const userServices = Object
			.entries(services)
			.filter(([key, value]) => {
				return typeof value === 'object';
			})
			.filter(([key, service]) => EmbedTool.checkServiceConfig(service))
			.map(([key, service]) => {
				const { regex, embedUrl, html, height, width, id } = service;

				return [key, {
					regex,
					embedUrl,
					html,
					height,
					width,
					id,
				} ];
			});

		if (enabledServices.length) {
			entries = entries.filter(([ key ]) => enabledServices.includes(key));
		}

		entries = entries.concat(userServices);

		EmbedTool.services = entries.reduce((result, [key, service]) => {
			if (!(key in result)) {
				result[key] = service;

				return result;
			}

			result[key] = Object.assign({}, result[key], service);

			return result;
		}, {});

		EmbedTool.patterns = entries
			.reduce((result, [key, item]) => {
				result[key] = item.regex;

				return result;
			}, {});

	}
}
