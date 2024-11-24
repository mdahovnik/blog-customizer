import { CSSProperties, useState } from "react";
import { ArticleStateType, defaultArticleState } from "src/constants/articleProps";
import { ArticleParamsForm } from "../article-params-form";
import { Article } from "../article";
import styles from './App.module.scss';

export const App = () => {
    const [currentArticleState, setCurrentArticleState] = useState<ArticleStateType>(defaultArticleState)

    const handleOnArticleChange = (state: ArticleStateType) => {
        setCurrentArticleState(state);
    }

    return (
        <main
            className={styles.main}
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
                onArticleChange={handleOnArticleChange}
                currentArticleState={currentArticleState} />
            <Article />
        </main>
    );
};