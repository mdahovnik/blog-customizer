import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType, ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);


const App = () => {
	const [backgroundColor, setBackgroundColor] = useState(defaultArticleState.backgroundColor.value);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor.value)
	const [fontFamily, setFontFamily] = useState(defaultArticleState.fontFamily.value);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSize.value);
	const [contentWidth, setContentWidth] = useState(defaultArticleState.contentWidth.value)

	const handleOnChange = (state: ArticleStateType) => {
		setBackgroundColor(state.backgroundColor.value);
		setFontColor(state.fontColor.value);
		setFontSize(state.fontSize.value);
		setFontFamily(state.fontFamily.value);
		setContentWidth(state.contentWidth.value)
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': fontFamily,
					'--font-size': fontSize,
					'--font-color': fontColor,
					'--container-width': contentWidth,
					'--bg-color': backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={handleOnChange} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
