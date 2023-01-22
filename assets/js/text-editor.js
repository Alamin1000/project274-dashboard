
  // js-for-text-editor
  const toolbar = document.querySelector("#toolbar");
const content = document.querySelector("#content");
const actions = Object.freeze([
	{
		id: "bold",
		icon: "format_bold",
		title: "Bold"
	},
	{
		id: "italic",
		icon: "format_italic",
		title: "Italic"
	},
	{
		id: "underline",
		icon: "format_underlined",
		title: "Underline"
	},
	{
		id: "justifyLeft",
		icon: "format_align_left",
		style: "textAlign:left",
		title: "Align left"
	},
	{
		id: "justifyCenter",
		icon: "format_align_center",
		style: "textAlign:center",
		title: "Align center"
	},
	{
		id: "outdent",
		icon: "format_indent_decrease",
		title: "Outdent"
	},
	{
		id: "insertUnorderedList",
		icon: "format_list_bulleted",
		title: "Add unordered list",
		tag: "ul"
	},
	{
		id: "insertImageByFile",
		icon: "insert_photo",
		title: "Add image"
	},
	{
		id: "createLink",
		icon: "link",
		title: "Add link"
	},
	{
		id: "emodji",
		icon: "sentiment_satisfied_alt",
		title: "Add emoji"
	},
	{
		id: "add",
		icon: "add",
		title: "Add"
	},
	{
		id: "undo",
		icon: "undo",
		title: "Undo"
	},
	{
		id: "redo",
		icon: "redo",
		title: "Redo"
	},
	{
		id: "menu_btn",
		icon: "more_vert",
		title: "Menu"
	}
]);

/**
 * Add toolbar buttons
 */
function setActionButton(action) {
	const button = document.createElement("button");
	const i = document.createElement("i");

	// 	Base props
	button.classList.add("action");
	button.title = action.title;
	button.dataset.action = action.id;

	if (action.style) button.dataset.style = action.style;
	if (action.tag) button.dataset.style = action.tag;

	// 	Action
	button.addEventListener("click", executeAction);

	// 	Icon
	i.classList.add("material-icons");
	i.innerText = action.icon;
	button.append(i);

	return button;
}

/**
 * Executes actions on the editable content wrapper
 * @param e - The mouse event
 * @see {@link https://developer.mozilla.org/es/docs/Web/API/Document/execCommand}
 * @see {@link https://developer.mozilla.org/es/docs/Web/HTML/Global_attributes/contenteditable}
 */
function executeAction(e) {
	const target = e.currentTarget;
	const action = target.dataset.action;

	content.focus();

	switch (action) {
		case "createLink":
			const anchorUrl = prompt("Insert the anchor URL");

			if (anchorUrl) document.execCommand(action, false, anchorUrl);

			break;
		case "insertImageByUrl":
			const imageUrl = prompt("Insert the image URL");

			if (imageUrl) {
				document.execCommand("insertImage", false, imageUrl);
			}

			break;
		case "insertImageByFile":
			const fileUploadInput = document.querySelector("#image-upload-input");

			fileUploadInput.click();

			fileUploadInput.onchange = () => {
				const [file] = fileUploadInput.files;

				if (file)
					document.execCommand("insertImage", false, URL.createObjectURL(file));
			};

			break;
		default:
			document.execCommand(action, false);
			break;
	}
}

for (const action of actions) {
	const actionButton = setActionButton(action);

	if (action.submenu) {
		const submenu = document.createElement("div");
		let submenuVisible = false;

		submenu.classList.add("submenu");

		for (const subaction of action.submenu) {
			const subActionButton = setActionButton(subaction);
			submenu.append(subActionButton);
		}

		actionButton.addEventListener("click", (e) => {
			e.preventDefault();
			submenu.classList.toggle("visible");
		});

		actionButton.classList.add("has-submenu");
		actionButton.append(submenu);
	}

	toolbar.append(actionButton);
}
