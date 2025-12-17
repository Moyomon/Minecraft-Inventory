
import {View}		from './View.js'
import {Rect}		from './Rect.js'

export class SVG extends View{
	createElement(s)	{
		return document.createElementNS('http://www.w3.org/2000/svg',s||'svg')
	}
	uuid(){
		var url = URL.createObjectURL(new Blob())
		URL.revokeObjectURL(url)
		return url.slice(-36)
	}
	position(x,y){
		if(this.node.hasAttribute('x')){
			return this.addAttribute('x',x).addAttribute('y',y)
		}
		return this.addAttribute('transform',`translate(${x},${y})`)
	}
	addArray(a){
		if(a instanceof Rect) return this.add(a.getRect())
		return super.addArray(a)
	}
}
