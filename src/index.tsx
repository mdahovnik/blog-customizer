import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);


const App = () => {
	const [currentArticleState, setArticleState] = useState<ArticleStateType>(defaultArticleState)

	const handleOnChange = (state: ArticleStateType) => {
		setArticleState(state);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentArticleState.fontFamily.value,
					'--font-size': currentArticleState.fontSize.value,
					'--font-color': currentArticleState.fontColor.value,
					'--container-width': currentArticleState.contentWidth.value,
					'--bg-color': currentArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onChange={handleOnChange}
				currentArticleState={currentArticleState} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
