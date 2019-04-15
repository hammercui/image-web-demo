import React from 'react';
import Link from 'umi/link';
import * as styles from './ImagePage.less';
import { connect } from 'dva';
import { Iimg, Icatalog } from '@/models/img';
import ZImage from '../components/ZImage/index';
export interface ImagePageProps {
	dispatch: Function;
	catalog: Icatalog[];
	content: Map<string, string[]>;
	currPage: number;
	pageSize: number;
	selectId: number;
}

@connect(({ imgd }: { imgd: Iimg }) => ({
	catalog: imgd.catalog,
	content: imgd.content,
	currPage: imgd.currPage,
	pageSize: imgd.pageSize,
	selectId: imgd.selectCatId
}))
class ImagePage extends React.Component<ImagePageProps, any> {
	renderHeader() {
    const { catalog, selectId,content } = this.props;
    const preId = selectId -1;
    const nextId = selectId + 1;
    const isPre = catalog[preId]&& content[preId].length >0;
    const isNext = catalog[nextId]&& content[nextId].length >0;
		return (
			<div className={styles.header}>
				{isPre? <div onClick={this.handlePre}>上一页</div> : <div>无</div>}
				<Link to="home">目录</Link>
				{isNext? <div onClick= {this.handleNext}>下一页</div> : <div>无</div>}
			</div>
		);
	}

  handlePre = ()=>{
    const { dispatch,selectId } = this.props;
		dispatch({ type: 'imgd/setSelect', payload: selectId - 1 });
  }

  handleNext = ()=>{
    const { dispatch,selectId } = this.props;
		dispatch({ type: 'imgd/setSelect', payload: selectId +1 });
  }


	render() {
		const { catalog, selectId,content } = this.props;
    const title = catalog[selectId - 1]?catalog[selectId - 1].name:"空";
    const data  = content && content[selectId]?content[selectId]:[];
		return (
			<div className={styles.content}>
				<h1>{title}</h1>
				{this.renderHeader()}
				{
          data.map((value,index)=>{
            return <ZImage src={title+"/"+value} key={index} className={styles.img}></ZImage>
          })
        }
				{this.renderHeader()}
			</div>
		);
	}
}

export default ImagePage;
