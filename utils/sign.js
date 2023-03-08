import md5 from 'md5.js'
export const sign = function(data){
	let secrect = '123456ABCDEFGHIJKL{(&#!,.&*)}MNOPQRSTUVWXYZ789070000'
	md5.hex_md5(data + "&" + secrect)
}