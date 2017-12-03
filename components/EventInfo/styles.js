import css from 'styled-jsx/css';

// export const button = css`button { color: hotpink; }`
export default css`
	.lead-title, .support-title {
		text-align: center;
	}
	.lead-title {
		text-shadow: 2px 2px 1px rgba(0,0,0,.3);
	}
	hr {
		background-image: -webkit-linear-gradient(top,transparent 50%,#b4b8be 0);
		background-image: linear-gradient(180deg,transparent 50%,#b4b8be 0);
		background-position: 0 50%;
		background-repeat: repeat-x;
		background-size: 100% .15rem;
		border: 0;
		margin: 0;
		padding-bottom: 3rem;
		padding-top: 3rem;
	}
	.section-spacer {
		padding: 1rem 0;
	    background-image: -webkit-linear-gradient(top,rgba(50,50,50,.5) 50%,hsla(0,0%,100%,.1) 0);
	    background-image: linear-gradient(180deg,rgba(50,50,50,.5) 50%,hsla(0,0%,100%,.1) 0);
	    background-size: 100% 2px;
	}
	.section-spacer--compact {
		padding: 1rem 0;
		margin: -1rem 0;
	}

	.support-title {
		text-shadow: 1px 1px 1px rgba(0,0,0,.3);
	}

	.event__header {
		margin-bottom: 1rem;
	}
`
//
// export default () => (
// 	<style jsx>{`
// 		h1 {
// 			color: red;
// 		}
// 	`}</style>
// );
