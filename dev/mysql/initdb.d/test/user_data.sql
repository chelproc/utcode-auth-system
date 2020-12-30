INSERT INTO `user`.`user`
(username, nickname, fullname, affiliation, joined_at)
VALUES('chelchel', 'ChelChel', '永谷 龍彦', '東大２年', '2019-08-15');

INSERT INTO `user`.`auth_newcomer`
(user_id, hash, expire_at)
VALUES(1, 'randomstr', '2020-08-29 17:00:00.000');

INSERT INTO `user`.`auth_google`
(user_id, email, profile_id)
VALUES(1, 'ttttt1712@gmail.com', '102482490800473280928');

INSERT INTO `user`.`permission`
(user_id, type)
VALUES(1, 1);
