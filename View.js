


class Addict{
	add(...a){
		//console.log(a)
		for(var v of a) switch(typeof v){
			case 'object'	:v&&this.addObject(v)	;break
			case 'string'	:v&&this.addString(v)	;break
			case 'function'	:this.addFunction(v)	;break
			case 'number'	:this.addNumber(v)		;break
			case 'boolean'	:this.addBoolean(v)		;break
			default			:console.log('x',v)
		}
		return this
	}
	addObject(v){
		switch(true){
			case v.constructor==Object	:return this.addBrace(v)
			case v instanceof Array		:return this.addArray(v)
			case v instanceof String	:return this.addString(String(v))
		}
		return this
	}
	addString(v)	{return this}	addFunction(v)	{return this}
	addNumber(v)	{return this}	addBoolean(v)	{return this}
	addArray(v)		{return this}	addEntry(v)		{return this}	
	addBrace(v)		{for(var a of Object.entries(v)) this.addEntry(a);return this}
}

Addict.View = class extends Addict{
	constructor(...a){
		super().add(...this.shorthand(a))
	}
	shorthand(a){
		if(typeof a[0]=='string'){
			if(/<.+>/.test(a[0])){
				var n = this.createElement()
				n.innerHTML = a.shift()
				this.node = n.firstChild||this.createElement()
			}else{
				var b = a.shift().trim().split('.')
				var s = b.shift()
				if(/^#/.test(s)) var n = document.getElementById(s.slice(1))
				this.node = n||this.createElement(s)
				this.class(...b)
			}
		}else if(a[0] instanceof Element){
			this.node = a.shift()
		}else{
			this.node = this.createElement()
		}
		return a
	}
	createElement(s){return document.createElement(s||'DIV')}
	data(o)			{for(var[k,v] of Object.entries(o)) this.node.dataset[k]=v;return this}
	style(s)		{this.node.style.cssText+=s;return this}
	class(...a)		{a.length&&this.node.classList.add(...a);return this}
	remove()		{this.node.remove();return this}
	replace(...a)	{this.node.innerHTML='';return this.add(...a)}/*x ios replaceChildren*/
	toggle(...a)	{this.node.classList.toggle(...a);return this}
	query(s)		{return this.node.querySelector(s)}
	queryAll(s)		{return [...this.node.querySelectorAll(s)]}
	display(b){
		if(b)	this.node.style.removeProperty('display')
		else 	this.node.style.display = 'none'
		return	this
	}
}

export class View extends Addict.View{
	addObject(v){
		switch(true){
			case v instanceof View	:this.node.append(v.node)	;break
			case v instanceof Node	:this.node.append(v)		;break
			default					:super.addObject(v)
		}
		return this
	}
	addEntry(a){
		switch(typeof a[1]){
			case 'function'	:this.addListener(...a)	;break
			default			:this.addAttribute(...a)	
		}
		return this
	}
	addListener(...a)	{
		console.log(a)

		this.node.addEventListener(...a)				;return this}
	addFunction(v)		{this.node.onclick = v							;return this}
	addNumber(v)		{this.node.append(v)							;return this}
	addString(v)		{this.node.insertAdjacentHTML('beforeend',v)	;return this}
	addAttribute(k,v)	{this.node.setAttribute(k,v)					;return this}
	addProperty(k,v)	{Object.defineProperty(this,k,{value:v})		;return this}
}

