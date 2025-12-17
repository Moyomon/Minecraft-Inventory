


import {SVG}		from './SVG.js'
import {Rect}		from './Rect.js'

export class NineSlice extends SVG{
	constructor(id,rect,border){
		super('defs.NineSlice')
		var rects	= new Rects().create(rect,border)
		this.items	= rects.map(v=>'symbol-'+this.uuid())
		this.border	= border
		this.add(...rects.map((v,i)=>new SVG('symbol',
			{id:this.items[i]},v.getViewBox(),{preserveAspectRatio:'none'},`<use href="${id}"/>`
		)))
	}
	create(rect){
		return new Instance(this,rect)
	}
}

class Instance extends SVG{
	constructor({items,border},rect){
		super('g')
		this.x = 0
		this.y = 0
		var rects = new Rects().create(rect,border)
		this.add(...rects.map((v,i)=>new SVG('use',{href:'#'+items[i]},v.getRect())))
	}
	position(x,y){
		this.x = Math.floor(x)
		this.y = Math.floor(y)
		return this.addAttribute('transform',`translate(${this.x},${this.y})`)
	}
}

class Rects extends Array{
	create(rect,border){
		var x1=0,		x2=border,	x3=rect.width-border
		var y1=0,		y2=border,	y3=rect.height-border
		var w1=border,	w2=x3-x2,	w3=border
		var h1=border,	h2=y3-y2,	h3=border
		this.push(
			new Rect(x1,y1,w1,h1),new Rect(x2,y1,w2,h1),new Rect(x3,y1,w3,h1),
			new Rect(x1,y2,w1,h2),new Rect(x2,y2,w2,h2),new Rect(x3,y2,w3,h2),
			new Rect(x1,y3,w1,h3),new Rect(x2,y3,w2,h3),new Rect(x3,y3,w3,h3),
		)
		return this
	}
}

