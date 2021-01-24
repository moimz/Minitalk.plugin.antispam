/**
 * 이 파일은 미니톡 스팸방지 플러그인의 일부입니다. (https://www.minitalk.io)
 *
 * 광고메시지를 차단합니다.
 * 
 * @file /plugins/antispam/script.js
 * @author Arzz (arzz@arzz.com)
 * @license MIT License
 * @version 1.0.0
 * @modified 2021. 1. 21.
 */
if (Minitalk === undefined) return;

/**
 * 안티스팸 플러그인 적용을 받지 않을 최소권한
 * 0 ~ 9 : 0 : 손님, 9 : 관리자
 */
me.limit = 0;

// 메시지 전송직전 URL 이 포함되어 있는지 확인한다.
Minitalk.on("beforeSendMessage",function(minitalk,message,user) {
	// 메시지에 URL 이 포함된 경우
	if (message.search(/(http|https|ftp):\/\//) >= 0) {
		if (user.level < me.limit) {
			minitalk.ui.printSystemMessage("error","채팅메시지에 URL을 포함할 수 없습니다.");
			return false;
		}
	}
});