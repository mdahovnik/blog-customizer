import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Select } from 'src/ui/select';
import { backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({ isOpen, rootRef: containerRef, onChange: setIsOpen });

	const handleArrowBtnClick = () => {
		setIsOpen(!isOpen);
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
					className={styles.form}>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={defaultArticleState.fontFamilyOption} />

					<RadioGroup
						title='Размер шрифта'
						name='ффф'
						options={fontSizeOptions}
						selected={defaultArticleState.fontSizeOption} />

					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={defaultArticleState.fontColor} />

					<Separator></Separator>

					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={defaultArticleState.backgroundColor} />

					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={defaultArticleState.contentWidth} />
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
