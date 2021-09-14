/* eslint-disable no-useless-escape */
export default {
	vimeo: {
		regex: /(?:http[s]?:\/\/)?(?:www.)?(?:player.)?vimeo\.co(?:.+\/([^\/]\d+)(?:#t=[\d]+)?s?$)/,
		embedUrl: 'https://player.vimeo.com/video/<%= remote_id %>?title=0&byline=0',
		html: '<iframe style="width:100%;" height="320" frameborder="0"></iframe>',
		height: 320,
		width: 580,
	},
	youtube: {
		regex: /(?:https?:\/\/)?(?:www\.)?(?:(?:youtu\.be\/)|(?:youtube\.com)\/(?:v\/|u\/\w\/|embed\/|watch))(?:(?:\?v=)?([^#&?=]*))?((?:[?&]\w*=\w*)*)/,
		embedUrl: 'https://www.youtube.com/embed/<%= remote_id %>',
		html: '<iframe style="width:100%;" height="320" frameborder="0" allowfullscreen></iframe>',
		height: 320,
		width: 580,
		id: ([id, params]) => {
			if (!params && id) {
				return id;
			}

			const paramsMap = {
				start: 'start',
				end: 'end',
				t: 'start',
				// eslint-disable-next-line camelcase
				time_continue: 'start',
				list: 'list',
			};

			params = params.slice(1)
				.split('&')
				.map(param => {
					const [name, value] = param.split('=');

					if (!id && name === 'v') {
						id = value;

						return null;
					}

					if (!paramsMap[name]) {
						return null;
					}

					return `${paramsMap[name]}=${value}`;
				})
				.filter(param => !!param);

			return id + '?' + params.join('&');
		},
	},
	instagram: {
		regex: /https?:\/\/www\.instagram\.com\/p\/([^\/\?\&]+)\/?/,
		embedUrl: 'https://www.instagram.com/p/<%= remote_id %>/embed',
		html: '<iframe width="400" height="505" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
		height: 505,
		width: 400,
	},
	twitter: {
		regex: /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)(?:\/.*)?$/,
		embedUrl: 'https://twitframe.com/show?url=https://twitter.com/<%= remote_id %>',
		html: '<iframe width="600" height="600" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
		height: 300,
		width: 600,
		id: ids => ids.join('/status/'),
	},
	pinterest: {
		regex: /https?:\/\/([^\/\?\&]*).pinterest.com\/pin\/([^\/\?\&]*)\/?$/,
		embedUrl: 'https://assets.pinterest.com/ext/embed.html?id=<%= remote_id %>',
		html: "<iframe scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; min-height: 400px; max-height: 1000px;'></iframe>",
		id: (ids) => {
			return ids[1];
		},
	},
	facebook: {
		regex: /https?:\/\/www.facebook.com\/([^\/\?\&]*)\/(.*)/,
		embedUrl: 'https://www.facebook.com/plugins/post.php?href=https://www.facebook.com/<%= remote_id %>&width=500',
		html: "<iframe scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; min-height: 500px; max-height: 1000px;'></iframe>",
		id: (ids) => {
			return ids.join('/');
		},
	},
	captivate: {
		regex: /https?:\/\/player.captivate.fm\/episode\/([\w\d-]+)/,
		embedUrl: 'https://player.captivate.fm/episode/<%= remote_id %>',
		html: "<iframe style=\"width: 100%; height: 170px;\" frameBorder=\"no\" scrolling=\"no\" seamless></iframe>",
		height: 170,
	},
	podbean: {
		regex: /https?:\/\/www\.podbean\.com\/(?:ew)\/pb-([\w\d-]+)/,
		embedUrl: 'https://www.podbean.com/player-v2/?i=<%= remote_id %>-pb&from=embed&square=1&share=1&download=1&skin=1&btn-skin=7&size=160',
		html: "<iframe allowTransparency=\"true\" style=\"border: none; min-width: min(100%, 430px);\" " +
			"scrolling=\"no\" data-name=\"pb-iframe-player\" allowFullScreen=\"\" width=\"100%\" height=\"160\"></iframe>",
		height: 160,
	},
	applePodcastEpisode: {
		regex: /https?:\/\/podcasts.apple.com\/\w+\/podcast\/(?:[\w-]+)\/(id[\d]+\?i=\d+)/,
		embedUrl: 'https://embed.podcasts.apple.com/us/podcast/<%= remote_id %>',
		html: "<iframe allow=\"autoplay *; encrypted-media *; fullscreen *\" frameBorder=\"0\" height=\"170\"\n" +
			" style=\"width:100%;max-width:660px;overflow:hidden;background:transparent;\"\n" +
			" sandbox=\"allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation\"></iframe>",
		height: 170,
	},
	applePodcastChannel: {
		regex: /https?:\/\/podcasts.apple.com\/\w+\/podcast\/(?:[\w-]+)\/(id[\d]+)/,
		embedUrl: 'https://embed.podcasts.apple.com/us/podcast/<%= remote_id %>',
		html: "<iframe allow=\"autoplay *; encrypted-media *; fullscreen *\" frameBorder=\"0\" height=\"450\"\n" +
			" style=\"width:100%;max-width:660px;overflow:hidden;background:transparent;\"\n" +
			" sandbox=\"allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation\"></iframe>",
		height: 450,
	},
	anchor: {
		regex: /https?:\/\/anchor.fm\/(?:[\w\d-]+)\/episodes\/([\w\d-]+\/[\w\d-]+)/,
		embedUrl: 'https://anchor.fm/podcast/embed/episodes/<%= remote_id %>',
		html: "<iframe height=\"102px\" width=\"400px\" frameBorder=\"0\" scrolling=\"no\"></iframe>",
		height: 180,
	},
	simplecast: {
		regex: /https?:\/\/player.simplecast.com\/([\w\d-]+)/,
		embedUrl: 'https://player.simplecast.com/<%= remote_id %>?dark=false',
		html: "<iframe height=\"200px\" width=\"100%\" frameBorder=\"no\" scrolling=\"no\" seamless></iframe>",
		height: 200,
	},
};
