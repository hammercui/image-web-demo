/*
 * @Description: 图片主页
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-01-19 17:03:17
 * @LastEditors: hammercui
 * @LastEditTime: 2019-01-21 11:56:02
 */

import React from 'react';
import { connect } from 'dva';
import { Iimg, Icatalog } from '@/models/img';
import * as styles from './HomePage.less';
import { Pagination } from 'antd';
import router from 'umi/router';

export interface HomePageProps {
	dispatch: Function;
	catalog: Icatalog[];
	content: Map<string, string[]>;
	currPage: number;
	pageSize: number;
}

@connect(({ imgd }: { imgd: Iimg }) => ({
	catalog: imgd.catalog,
	content: imgd.content,
	currPage: imgd.currPage,
	pageSize: imgd.pageSize
}))
class HomePage extends React.Component<HomePageProps, any> {
	handleLogin = () => {
		const { dispatch } = this.props;
		dispatch({
			type: 'imgd/fetchImg'
		});
	};

	constructor(props) {
		super(props);
		this.props.dispatch({
			type: 'imgd/fetchImg'
		});
	}

	render() {
		return (
			<div>
				{this.renderCatelog()}
				{/* {this.renderImgList()} */}
			</div>
		);
	}

	//渲染目录
	renderCatelog = () => {
		const { catalog, currPage, pageSize, content } = this.props;
		const start = (currPage - 1) * pageSize;
		const end = start + pageSize;
		const dataSoucre = catalog.slice(start, end);
		return (
			<div>
				<h1>目录</h1>
				{dataSoucre.map((item, index) => {
					if (content[item.id] && content[item.id].length > 0) {
						return (
							<div
								className={styles.catelog}
								key={index}
								onClick={() => {
									this.handleCatelog(item);
								}}
							>
								{item.name}
							</div>
						);
					}
					return null;
				})}
				<Pagination
					total={catalog.length}
					defaultCurrent={1}
					onChange={this.handleChangePage}
					pageSize={pageSize}
					current={currPage}
				/>
			</div>
		);
	};
	//翻页
	handleChangePage = (pageNumber: number, pageSize: number) => {
		const { dispatch } = this.props;
		dispatch({
			type: 'imgd/setChangePage',
			payload: {
				currPage: pageNumber,
				pageSize: pageSize
			}
		});
	};

	//渲染图片列表
	// renderImgList = ()=>{

	// }

	// handleClick = ()=>{
	//   console.log("click")
	// }

	handleCatelog = (item: Icatalog) => {
		console.log('点击', item.name);
		router.replace('/image');
		const { dispatch } = this.props;
		dispatch({ type: 'imgd/setSelect', payload: item.id });
	};
}

export default HomePage;
