import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	ArticleStateType
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useEnterSubmit } from 'src/ui/select/hooks/useEnterSubmit';

type TFormFields = {
	onChange: (value: ArticleStateType) => void
}


export const ArticleParamsForm = ({ onChange }: TFormFields) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>({ ...defaultArticleState })
	const containerRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({ isOpen, rootRef: containerRef, onChange: setIsOpen });
	// useEnterSubmit({placeholderRef: containerRef, onChange: setIsOpen})

	const handleArrowBtnClick = () => {
		setIsOpen(!isOpen);
	}

	const handleFontFamilySelect = (value: OptionType) => {
		setFormState({ ...formState, fontFamily: value })
	}

	const handleFontSizeSelect = (value: OptionType) => {
		setFormState({ ...formState, fontSize: value })
	}

	const handleFontColorSelect = (value: OptionType) => {
		setFormState({ ...formState, fontColor: value })
	}

	const handleBackgroundColorSelect = (value: OptionType) => {
		setFormState({ ...formState, backgroundColor: value })
	}

	const handleContentWidthSelect = (value: OptionType) => {
		setFormState({ ...formState, contentWidth: value })
	}

	const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onChange(formState);
	}

	const handleResetForm = () => {
		setFormState({ ...defaultArticleState })
		onChange({ ...defaultArticleState })
	}

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={handleArrowBtnClick} />
			<aside
				className={clsx(styles.container, { [styles.containerOpen]: isOpen })}
				ref={containerRef} >
				<form
					className={clsx(styles.form, styles.formNoScroll)}
					onSubmit={handleSubmitForm}
					onReset={handleResetForm}>
					<Text
						size={31}
						weight={800}
						family='open-sans'
						uppercase>задать параметры</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamily}
						onChange={handleFontFamilySelect}
					/>

					<RadioGroup
						title='размер шрифта'
						name=''
						options={fontSizeOptions}
						selected={formState.fontSize}
						onChange={handleFontSizeSelect} />

					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleFontColorSelect}
					/>

					<Separator></Separator>

					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleBackgroundColorSelect} />

					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleContentWidthSelect} />
					<div
						className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear' />
						<Button
							title='Применить'
							htmlType='submit'
							type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
