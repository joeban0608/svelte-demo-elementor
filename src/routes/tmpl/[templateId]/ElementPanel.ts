enum ElementType {
	Text = 'text',
	Button = 'button',
	Image = 'image'
}

export class ElementPanel {
	ele: HTMLElement;
	type: ElementType;
	#_defaultFontSize = '16';
	#_prevStyle_border: CSSStyleDeclaration['border'] = 'unset';

	constructor(ele: HTMLElement) {
		this.ele = ele;
		switch (ele.tagName) {
			case 'BUTTON':
				this.type = ElementType.Button;
				break;
			case 'IMG':
				this.type = ElementType.Image;
				break;
			case 'H1':
			case 'H2':
			case 'H3':
			case 'H4':
			case 'H5':
			case 'H6':
			case 'P':
			case 'LABEL':
				this.type = ElementType.Text;
				break;
			default:
				throw new Error('Unsupported element type');
		}

		this.#_prevStyle_border = this.ele.style.border;
		this.ele.style.border = '1px solid red';
	}

	destroy() {
		this.ele.style.border = this.#_prevStyle_border;
	}

	get current() {
		return {
			style: this.ele.style
		};
	}

	text(text: string) {
		console.log('text', text);

		if (this.type !== ElementType.Text) return;
		this.ele.textContent = text;
	}

	fontSize(size: number) {
		if (this.type === ElementType.Image) return;
		this.ele.style.fontSize = `${size}px`;
	}

	fontSizeUp() {
		const currentSize = parseInt(this.ele.style.fontSize || this.#_defaultFontSize);
		this.fontSize(currentSize + 1);
	}

	fontSizeDown() {
		const currentSize = parseInt(this.ele.style.fontSize || this.#_defaultFontSize);
		this.fontSize(currentSize - 1);
	}
}
