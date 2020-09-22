/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import s from './MessageList.module.scss';
import MyMessage from './components/MyMessage/MyMessage';
import OwnerMessage from './components/OwnerMessage/OwnerMessage';
import {
  List,
  AutoSizer,
  CellMeasurer,
  InfiniteLoader,
  CellMeasurerCache,
} from 'react-virtualized';
import { v4 } from 'uuid';
import { createRef } from 'react';
import { Spinner } from 'reactstrap';
import { useViewer } from '../../../../../../stores/ViewerStore';
import { observer } from 'mobx-react';

const limit = 10;
const _cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 50,
});

const MessageList = ({ chatId, chat }) => {
  let messages = chat.messages.asList();
  const viewerId = useViewer().user.id;

  const listRef = createRef();

  const isRowLoaded = useCallback(({ index }) => {
    return !!messages[index];
  }, []);
  const loadMoreRows = useCallback(async () => {
    if (!chat.messages.fetchMessages.isLoading)
      chat.messages.fetchMessages.run(chatId, limit);
  }, []);
  const onScroll = useCallback(
    async ({ scrollTop, clientHeight }) => {
      if (clientHeight === 0) {
        return;
      }
      if (scrollTop === 0) {
        if (!chat.messages.fetchMessages.isLoading) {
          chat.messages.fetchMessages.run(chatId, limit);
        }
      }
    },
    [],
  );

  useEffect(() => {
    chat.messages.fetchMessages.run(
      limit,
      messages.length ? messages.length : 0,
    );
  }, []);

  useEffect(() => {
    //if messsages are fetching, we add one empty element.
    //it will be spinner
    if (chat.messages.fetchMessages.isLoading && messages[0])
      messages = [null, ...messages];
  }, [chat.messages]);

  return messages.map((message) => {
    return Number(message.ownerId) === Number(viewerId) ? (
      <MyMessage key={message.id} message={message} />
    ) : (
      <OwnerMessage key={message.id} message={message} />
    );
  });

  _cache.clearAll();
  _cache.clear();

  const rowRenderer = useCallback(
    ({ ref, key, index, parent, style }) => {
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
            <MyMessage
              style={{ ...style }}
              message={messages[index]}
            />
          ) : (
            <OwnerMessage style={style} message={messages[index]} />
          )}
        </CellMeasurer>
      );
    },
    [],
  );

  // eslint-disable-next-line no-unused-vars
  const _getIndex = useCallback(() => {
    // return chat.messages.fetchMessages.isLoading
    //   ? 0
    //   : limit !== .settingFetch?.scrollToIndex
    //   ? messages.length
    //   : this.props.settingFetch?.scrollToIndex;
  }, []);

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
                    //                    scrollToIndex={_getIndex()}
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
};

export default observer(MessageList);
