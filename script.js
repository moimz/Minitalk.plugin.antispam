/**
 * 이 파일은 미니톡 스팸방지 플러그인의 일부입니다. (https://www.minitalk.io)
 *
 * 광고메시지를 차단합니다.
 * 
 * @file /plugins/antispam/script.js
 * @author Arzz (arzz@arzz.com)
 * @license MIT License
 * @version 1.0.0
 * @modified 2020. 12. 28.
 */
if (Minitalk.version < 70000) {
	/**
	 * 미니톡 v7.0 이하의 버전에서 안티스팸 플러그인 적용을 받지 않을 최소권한
	 * ALL : 전체유저가 안티스팸 플러그인 적용을 받지 않음
	 * MEMBER : 회원권한 이상인 경우 안티스팸 플러그인 적용을 받지 않음
	 * ADMIN : 관리자권한 이상인 경우 안티스팸 플러그인 적용을 받지 않음
	 */
	me.limit = "MEMBER";
} else {
	/**
	 * 미니톡 v7.0 이상의 버전에서 안티스팸 플러그인 적용을 받지 않을 최소권한
	 * 0 ~ 9 : 0 : 손님, 9 : 관리자
	 */
	me.limit = 1;
}

// 미니톡에 접속된 뒤, 자신의 권한에 따라 알림메시지를 출력한다.
Minitalk.on("connect",function(minitalk,channel,user) {
	if (Minitalk.version < 70000) {
		if (Minitalk.user.checkLimit(me.limit,user.opper) == true) {
			minitalk.ui.printMessage("system","채팅메시지에 URL을 포함할 수 없습니다.");
		}
	} else {
		if (user.level < me.limit) {
			minitalk.ui.printSystemMessage("info","채팅메시지에 URL을 포함할 수 없습니다.");
		}
	}
});

// 메시지 전송직전 URL 이 포함되어 있는지 확인한다.
Minitalk.on("beforeSendMessage",function(minitalk,message,user) {
	// 메시지에 URL 이 포함된 경우
	if (message.search(/(http|https|ftp):\/\//) >= 0) {
		if (Minitalk.version < 70000) {
			if (Minitalk.user.checkLimit(me.limit,user.opper) == true) {
				minitalk.ui.printMessage("error","채팅메시지에 URL을 포함할 수 없습니다.");
				return false;
			}
		} else {
			if (user.level < me.limit) {
				minitalk.ui.printSystemMessage("error","채팅메시지에 URL을 포함할 수 없습니다.");
				return false;
			}
		}
	}
});