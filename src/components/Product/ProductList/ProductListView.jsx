import React, { Component } from 'react';
import { v4 } from 'uuid';
import s from './ProductList.module.scss';

import {
  CellMeasurer,
  AutoSizer,
  createMasonryCellPositioner,
  WindowScroller,
  CellMeasurerCache,
  Masonry,
} from 'react-virtualized';
import Product from '../../../scenes/Products/components/BriefProductInfo/BriefProductInfo';

class ProductList extends Component {
  constructor(props) {
    super(props);

    this._columnCount = 0;

    this._cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 209,
      fixedWidth: true,
    });

    this.state = {
      columnWidth: 209,
      gutterSize: 15,
      overscanByPixels: 10,
      products: props.products || [],
    };

    this._cellRenderer = this._cellRenderer.bind(this);
    this._onResize = this._onResize.bind(this);
    this._renderAutoSizer = this._renderAutoSizer.bind(this);
    this._renderMasonry = this._renderMasonry.bind(this);
    this._setMasonryRef = this._setMasonryRef.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    return true;
  }
  componentDidUpdate() {
    this._cache.clearAll();
    this._cache.clear();
    this._resetCellPositioner();
    this._masonry.clearCellPositions();
  }
  render() {
    const { overscanByPixels } = this.state;
    let child;
    child = (
      <div className={s.container}>
        <WindowScroller overscanByPixels={overscanByPixels}>
          {this._renderAutoSizer}
        </WindowScroller>
      </div>
    );

    return child;
  }
  _calculateColumnCount() {
    const { columnWidth, gutterSize } = this.state;

    this._columnCount = Math.floor(
      this._width / (columnWidth + gutterSize),
    );
  }
  _cellRenderer({ index, key, parent, style }) {
    const { products } = this.props;
    const { columnWidth } = this.state;
    //    console.log(this.props.products.length, index, this.props.products[index]?.title)

    return (
      <CellMeasurer
        cache={this._cache}
        index={index}
        key={v4()}
        parent={parent}
      >
        <div
          style={{
            ...style,
            width: columnWidth,
          }}
        >
          <Product product={products[index]} />
        </div>
      </CellMeasurer>
    );
  }
  _initCellPositioner() {
    if (typeof this._cellPositioner === 'undefined') {
      const { columnWidth, gutterSize } = this.state;

      this._cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this._cache,
        columnCount: this._columnCount,
        columnWidth,
        spacer: gutterSize,
      });
    }
  }
  _onResize({ width }) {
    this._width = width;

    this._calculateColumnCount();
    this._resetCellPositioner();
    this._masonry.recomputeCellPositions();
  }

  _renderAutoSizer({ height, scrollTop }) {
    this._height = height;
    this._scrollTop = scrollTop;

    const { overscanByPixels } = this.state;

    return (
      <AutoSizer
        disableHeight
        height={height}
        onResize={this._onResize}
        overscanByPixels={overscanByPixels}
        scrollTop={this._scrollTop}
      >
        {this._renderMasonry}
      </AutoSizer>
    );
  }
  _renderMasonry({ width }) {
    this._width = width;

    this._calculateColumnCount();
    this._initCellPositioner();
    const { overscanByPixels } = this.state;
    const { products } = this.props;
    return (
      <Masonry
        autoHeight={true}
        cellCount={products.length}
        cellMeasurerCache={this._cache}
        cellPositioner={this._cellPositioner}
        cellRenderer={this._cellRenderer}
        height={this._height}
        overscanByPixels={overscanByPixels}
        ref={this._setMasonryRef}
        scrollTop={this._scrollTop}
        width={width}
        data={products}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      />
    );
  }
  _resetCellPositioner() {
    const { columnWidth, gutterSize } = this.state;

    this._cellPositioner.reset({
      columnCount: this._columnCount,
      columnWidth,
      spacer: gutterSize,
    });
  }

  _setMasonryRef(ref) {
    this._masonry = ref;
  }
}

export default ProductList;
