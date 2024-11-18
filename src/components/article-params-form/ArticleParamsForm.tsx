import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({ isOpen, rootRef: containerRef, onChange: setIsOpen });

	const handleArrowBtnClick = () => {
		setIsOpen(!isOpen);
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowBtnClick} />
			<aside className={clsx(styles.container, { [styles.containerOpen]: isOpen })}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
