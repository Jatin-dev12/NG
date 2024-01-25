import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'parseUrl',
    standalone: true
})
export class ParseUrlPipe implements PipeTransform {

	urls: any = /(\b(https?|http|ftp|ftps|Https|rtsp|Rtsp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim; // Find/Replace URL's in text	
	hashtags: any = /(^|\s)(#[a-z\d][\w-]*)/ig; // Find/Replace #hashtags in text	
	mentions: any = /(^|\s)(@[a-z\d][\w-]*)/ig; // Find/Replace @Handle/Mentions in text	
	emails: any = /(\S+@\S+\.\S+)/gim; // Find/Replace email addresses in text
	emoji: any = /\:(\S+?)\:/g; //Find Emoji icons
	youtube: any = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

	transform(text: string) {
		return this.parseUrl(text);
	}

	private parseUrl(text: string) {


		// Find/Replace URL's in text
		/*if (text?.match(this.urls)) {
			text = text.replace(this.urls, function replacer($1, $2, $3) {
				let url: any = $1;
				let urlClean: any = url.replace("" + $3 + "://", "");
	
				return "<a href=\"" + url + "\" target=\"_blank\">" + urlClean + "</a>";
			});
		}*/

		// if (text?.match(this.urls)) {
		//     text = text.replace(this.urls, function replacer($1, $2, $3) {
		//         let url: any = $1;
		//         let urlClean: any = url.replace("" + $3 + "://", "");

		//         return "<div class=\"link-priviw\">" + urlClean + "</div>";
		//     });
		// }

		/*if (text?.match(this.youtube)) {
			let text2 = text.replace(this.youtube, function replacer($1, $2, $3) {
				let url: any = $1;
				let urlClean: any = url.replace("" + $3 + "://", "");
				console.log($1, $2, $3)
				return "<div class=\"link-priviw\">" + urlClean + "</div>";
			}); 
			text = text.replace(this.youtube, "<a href=\"$1/\" class=\"url-youtube\" target=\"_blank\">$1</a>");
		}*/

		if (text?.match(this.urls)) {
			text = text.replace(this.urls, "<a href=\"$1/\" class=\"url-link\" target=\"_blank\">$1</a>");
		}

		// Find/Replace @Handle/Mentions in text
		if (text?.match(this.hashtags)) {
			text = text.replace(this.hashtags, "<a href=\"/\" class=\"hashtag-link\">$1$2</a>");
			//text = text.replace(this.hashtags, "<a href=\"/search/hashtag/$2\" class=\"hashtag-link\">$1$2</a>");
		}

		// Find/Replace #hashtags in text
		if (text?.match(this.mentions)) {
			text = text.replace(this.mentions, "<a href=\"\" class=\"handle-link\">$1$2</a>");
		}

		// Find/Replace email addresses in text
		if (text?.match(this.emails)) {
			text = text.replace(this.emails, "<a href=\"mailto:$1\">$1</a>");
		}

		// Find emoji and replace icon
		if (text?.match(this.emoji)) {
			text = text.replace(this.emoji, "<i class=\"emoji $1\">$1</i>");
		}

		return text;
	}

}
