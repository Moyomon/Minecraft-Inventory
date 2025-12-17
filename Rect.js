


export class Rect extends Array{
	svg(n){
		this.length=0
		this.push(...[n.x,n.y,n.width,n.height].map(v=>v.baseVal.value))
		return this
	}
	client(n){
		this.length=0
		this.push(n.clientLeft,n.clientTop,n.clientWidth,n.clientHeight)
		return this
	}
	add(...a){
		if(a[0] instanceof Array) return this.addRect(a[0])
		return this.addRect(a)
	}
	addRect(a){
		return this.map((v,i)=>{
			if(a[i]) return v+a[i]
			return v
		})
	}
	position(x,y)	{this[0]=x;this[1]=y;return this}
	
	get x(){return this[0]}
	get y(){return this[1]}
	get width(){return this[2]}
	get height(){return this[3]}
	
	getViewBox(){return {viewBox:this.join(' ')}}
	getRect(){return {x:this[0],y:this[1],width:this[2],height:this[3]}}
	getSize(){return {width:this[2],height:this[3]}}
}


