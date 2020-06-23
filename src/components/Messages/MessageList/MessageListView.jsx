import React from 'react';
import s from './MessageList.module.scss';
import Spinner from '../../Spinner/Spinner';
import MyMessage from '../MyMessage/MyMessageContainer';
import OwnerMessage from '../OwnerMessage/OwnerMessageContainer';
import {
  List,
  AutoSizer,
  CellMeasurer,
  InfiniteLoader,
  CellMeasurerCache,
} from 'react-virtualized';
import { v4 } from 'uuid';
import { createRef } from 'react';

class MessageListView extends React.Component {
  constructor(props) {
    super(props);
    this._cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 50,
    });

    this.listRef = createRef();

    //if messsages are fetching, we add one empty element.
    //it will be spinner
    let messages = props.messages;
    if (props.fetchMessages.isLoading) {
      messages.unshift(null);
    }
    this.state = {
      messages: messages || [],
    };

    this._getIndex = this._getIndex.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this._setListRef = this._setListRef.bind(this);
  }

  _setListRef(ref) {
    this._list = ref;
  }
  componentDidUpdate(prevProps) {
    this._cache.clearAll();
    this._cache.clear();
  }

  componentWillReceiveProps(nextProps) {
    let messages = [];
    if (
      nextProps.fetchMessages.isLoading &&
      this.state.messages.length &&
      this.state.messages[0]
    ) {
      messages.unshift(null);
    }
    if (nextProps.messages.length)
      this.setState({
        messages: [...messages, ...nextProps.messages],
      });
  }

  rowRenderer({ ref, key, index, parent, style }) {
    const { viewerId } = this.props;
    const { messages } = this.state;
    const { _cache } = this;
    return (
      <CellMeasurer
        key={Number(messages[index]?.id) ? key : v4()}
        cache={_cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
        ref={ref}
        style={style}
      >
        {!messages[index] ? (
          <Spinner style={style} />
        ) : Number(messages[index].ownerId) === Number(viewerId) ? (
          <MyMessage style={{ ...style }} message={messages[index]} />
        ) : (
          <OwnerMessage style={style} message={messages[index]} />
        )}
      </CellMeasurer>
    );
  }

  render() {
    const { isRowLoaded, loadMoreRows, onScroll } = this.props;
    const { messages } = this.state;
    const { _cache, rowRenderer, _getIndex, listRef } = this;
    return (
      <div className={s.container}>
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={messages.length}
        >
          {({ onRowsRendered }) => {
            return (
              <AutoSizer overscanByPixels={100}>
                {({ height, width }) => {
                  return (
                    <List
                      width={width}
                      height={height}
                      ref={listRef}
                      onRowsRendered={onRowsRendered}
                      rowCount={messages.length}
                      deferredMeasurementCache={_cache}
                      rowHeight={_cache.rowHeight}
                      rowRenderer={rowRenderer}
                      scrollToIndex={_getIndex()}
                      onScroll={onScroll}
                    />
                  );
                }}
              </AutoSizer>
            );
          }}
        </InfiniteLoader>
      </div>
    );
  }

  _getIndex() {
    return this.props.fetchMessages.isLoading
      ? 0
      : this.props.limit !== this.props.settingFetch?.scrollToIndex
      ? this.state.messages.length
      : this.props.settingFetch?.scrollToIndex;
  }
}

export default MessageListView;
