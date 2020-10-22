class Storage {
	constructor(cldisabled) {
		this.cldisabled = cldisabled;

		this.regexObj = new RegExp("\{.*\:.*\}");

		this.getItem = (key) =>  { 
			return localStorage.getItem(key) 
		};

		this.setItem = (key, value) =>  { 
			return localStorage.setItem(key, value) 
		};

		this.getItemJSON = (key) =>  { 
			return JSON.parse(localStorage.getItem(key)) 
		};

		this.setItemJSON = (key, value) =>  { 
			return localStorage.setItem(key, JSON.stringify(value)) 
		};
	}

	set(key,value) {
		/** Kiểm tra `key` có tồn tại chưa */
		if(this.getItem(key) !== null) {
			(this.cldisabled == true) ? console.error(`Sorry, storage key '${key}' has been exist`) : '';
		/** Kiểm tra `value` đã nhập chưa */
		}else if(value === undefined) {
			(this.cldisabled == true) ? console.error(`Sorry, please enter value storage value is not empty`) : '';
		/** Nếu đã thõa hết điều kiện */
		}else {
			/** Nếu `value` loại JSON */
			if(this.regexObj.test(JSON.stringify(value))) {
				this.setItemJSON(key, value);
			/** Nếu `value` loại thường */
			} else {
				this.setItem(key, value);
			}
		}
	}

	get(key) {
		/** Kiểm tra `key` chưa tồn tại */
		if (this.getItem(key) === null) {
			(this.cldisabled == true) ? console.error(`Sorry, storage key '${key}' is not exist`) : '';
		/** Nếu đã thõa hết điều kiện */
		}else{
			/** Nếu `value` loại JSON */
			if (this.regexObj.test(this.getItem(key))) {
				return (this.getItemJSON(key)) ? this.getItemJSON(key) : [];
			/** Nếu `value` loại thường */
			} else {
				return (this.getItem(key)) ? this.getItem(key) : [];
			}
		}
	}

	update(key, index, value) {
		/** Kiểm tra `key` chưa tồn tại */
		if (this.getItem(key) === null) {
			(this.cldisabled == true) ? console.error(`Sorry, storage key '${key}' is not exist`) : '';
		/** Nếu đã thõa hết điều kiện */
		}else{
			/** Nếu `value` loại JSON */
			if (this.regexObj.test(this.getItem(key))) {
				let jsonStorage = this.getItemJSON(key);
					jsonStorage[index] = value;
				this.setItemJSON(key, jsonStorage);
			/** Nếu `value` loại thường */
			}else{
				this.setItem(key, index);
			}
			(this.cldisabled == true) ? console.log(`Storage key '${key}' has been up to date!`) : '';
		}
	}

	remove(key, index) {
		/** Kiểm tra `key` chưa tồn tại */
		if (this.getItem(key) === null) {
			(this.cldisabled == true) ? console.error(`Sorry, storage key '${key}' is not exist`) : '';
		/** Nếu đã thõa hết điều kiện */
		}else{
			/** Nếu `value` loại JSON */
			if (this.regexObj.test(this.getItem(key))) {
				/** Lấy giá trị JSON gán vào `jsonStorage` */
				var jsonStorage = this.getItemJSON(key);
				/** Nếu `jsonStorage` lớn hơn 0 */
				if (this.objLenght(jsonStorage) != 0) {
					/** Lập qua lấy mảng */
					for (var i = 0; i < this.objLenght(jsonStorage); i++) {
						/** Nếu đúng mảng */
						if (jsonStorage[index]) {
							/** Xóa bỏ phần tử đó */
							delete jsonStorage[index];
							/** Thông báo thành công */
							(this.cldisabled == true) ? console.log(`Storage key '${key}' has been delete '${index}'!`) : '';
							/** Cập nhật lại storage */
							return this.setItemJSON(key, jsonStorage);
						}else{
							return (this.cldisabled == true) ? console.error(`Storage key '${key}' not isset '${index}'!`) : '';
						}
					}
				}
			/** Nếu `value` loại thường */
			}else if (this.regexObj.test(this.getItem(key)) === false && index === undefined) {
				var confirmRemove = confirm(`Storage key '${key}' no keys left, press 'ok' will remove key '${key}'!`);
				if(confirmRemove) {
					localStorage.removeItem(key);
				}
			}
			/** Nếu `value` json null */
			if(this.getItem(key) === '{}') {
				var confirmRemove = confirm(`Storage key '${key}' no keys left, press 'ok' will remove key '${key}'!`);
				if(confirmRemove) {
					localStorage.removeItem(key);
				}
			}
		}
	}

	objLenght(obj) {
		/** Gán length = 0  */
		var length = 0, key;

		/** Sau mỗi lần lập length + 1  */
		for (key in obj) {
			/** Nếu không có value mới dừng ++  */
			if(obj.hasOwnProperty(key)) {
				length++;
			}
		}
		/** Trả về length */
		return length;
	}
}

export default Storage;