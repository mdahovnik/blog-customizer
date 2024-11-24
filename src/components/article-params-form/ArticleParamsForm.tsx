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

type TArticleParamsProps = {
	onArticleChange: (value: ArticleStateType) => void;
	currentArticleState: ArticleStateType
}


export const ArticleParamsForm = ({ currentArticleState, onArticleChange }: TArticleParamsProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentArticleState)
	const containerRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: containerRef,
		onChange: setIsMenuOpen
	});

	const handleArrowBtnClick = () => {
		setIsMenuOpen(!isMenuOpen);
	}

	const handleStateChange = (key: keyof ArticleStateType, value: OptionType) => {
		setFormState({ ...formState, [key]: value })
	}

	const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onArticleChange(formState);
	}

	const handleResetForm = () => {
		setFormState(defaultArticleState)
		onArticleChange(defaultArticleState)
	}

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={handleArrowBtnClick} />
			<aside
				className={clsx(styles.container, { [styles.containerOpen]: isMenuOpen })}
				ref={containerRef} >
				<form
					className={styles.form}
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
						onChange={(option) => handleStateChange('fontFamily', option)} />

					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSize}
						onChange={(option) => handleStateChange('fontSize', option)} />

					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) => handleStateChange('fontColor', option)}
					/>

					<Separator></Separator>

					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) => handleStateChange('backgroundColor', option)} />

					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) => handleStateChange('contentWidth', option)} />
						
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
