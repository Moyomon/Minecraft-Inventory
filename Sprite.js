


import {SVG}		from './SVG.js'
import {Rect}		from './Rect.js'

export class Sprite extends SVG{
	constructor(url){
		super('defs.Sprite')
		var name = this.getName(url)
		this.load(url,images=>{
			var a = images.map(n=>{
				var rect	= new Rect().svg(n).position(0,0)
				return new SVG('symbol',
					{id:name+'-'+n.id},
					rect.getSize(),
					rect.getViewBox(),
					{preserveAspectRatio:'none'},
					this.removeAttributes(n,'id','x','y','width','height')
				)
			})
			this.add(...a)
		})
	}
	getName(url){
		return url.split('/').pop().split('.')[0]
	}
	load(url,resolve){
		fetch(url).then(r=>r.text()).then(s=>{
			resolve(new SVG(s).queryAll('image[id]'))
		})
		return this
	}
	removeAttributes(n,...a){
		a.forEach(s=>n.removeAttribute(s))
		return n
	}
}


