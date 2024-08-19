<wxs module="utils" src="./utils.wxs" />

<template name="complaint">
  <view class="complaint" bindtap="toProductComplaint">
    <view>本页面由用户在草料二维码自行制作</view>
    <view>真实性与潜在风险请自行辨别</view>
    <view>如有疑问，请与制作者联系，或向有关部门 <text class="powerByLink">投诉</text></view>
  </view>
  <view class="divider"></view>
  <view bindtap="poweredJump">
    <view>草料二维码是一个二维码制作工具</view>
    <view>人人都可以免费使用 <text class="powerByLink">了解更多</text></view>
  </view>
</template>
<template name="powerBy">
  <view id="powerby" class="powerByWrapper {{isLight ? 'light' : 'dark'}}">
    <block wx:if="{{isWarnCode}}">
      <template is="complaint" />
    </block>
    <block wx:else>
      <powerby
        isLight="{{isLight}}"
        powerbyAbVersion="{{powerbyAbVersion}}"
        version="{{powerbyVersion}}"
        manualHandleClick
        bind:onTap="poweredJump"
      />
    </block>
  </view>
</template>

<view
  class="{{utils.getPageWrapperClass(isRecordCode, recordAddStatus, expandLog, isEdit, cardsLoading, msgIntial, showMsgList, showMsg, isCodeEmpty, isBgImgMode, isContentVisible, isColorExtend, operateMsg, isSkyline, fixedBottomComponentList.length, isFormSubmitBtnFixed, isShowFromSubmitBtn, hasFormQuickFilledTip)}}"
  style="{{utils.getPageWrapperBgColor(categoryType, isOpenedSearch, isCodeEmpty, cardsLoading, preData, 'page-wrapper', showMsgList, newPreData)}} ;padding-bottom: {{show_tabbar ? tabbarHeight : 0}}px;"
>
  <view
    wx:if="{{isBgImgMode}}"
    id="__outerContainer"
    class="outer-container high-z-index is-bg-img-fixed"
    style="{{outerContainerStyle}}"
  >
    <view style="{{innerContainerStyle}}">
      <view style="{{bgImageWrapperStyle}}">
        <image
          id="__fakeBgImage"
          style="{{bgImageStyle}}"
          src="{{smallBgImageSrc}}"
          bindload="{{isSkyline ? 'handleFakeBgImageLoaded' : utils.handleFakeBgImageLoaded}}"
          binderror="{{isSkyline ? 'handleFakeBgImageLoaded' : utils.handleFakeBgImageLoaded}}"
          change:bgImageTimeout="{{isSkyline ? '' : utils.handleBgImageTimeoutChange}}"
          bgImageTimeout="{{bgImageTimeout}}"
        />
        <image
          id="__realBgImage"
          class="bg-image"
          style="{{bgImageStyle}}"
          src="{{bgImageSrc}}"
          bindload="{{isSkyline ? 'handleRealBgImageLoaded' : utils.handleRealBgImageLoaded}}"
        />
      </view>
      <view style="{{gradientStyle}}" />
      <view style="{{maskStyle}}" />
      <view
        id="__bgLoadingEl"
        class="loading"
        style="margin-top:{{utils.getCustomHeaderHeight(statusBarHeight) + 88}}px;"
      >
        <image
          class="loading-image"
          src="/assets/loading.gif"
        />
      </view>
    </view>
  </view>
  <view
    wx:elif="{{isColorExtend}}"
    id="__outerContainer"
    class="outer-container"
    style="{{outerContainerStyle}}"
  />

  <!--coverify="{{headerCoverify && !isSummaryCode}}"-->
  <customHeader
    wx:if="{{showHeader}}"
    id="customHeader"
    showTitle="{{tplQrcodeStatus !== 4}}"
    title="{{customTitle}}"
    blackReturn="{{utils.getBlackReturn(preData, newPreData)}}"
    customColor="{{utils.getCustomColor(isSummaryCode, categoryType, isOpenedSearch, renderEnd, cardsLoading, titleTobottom, preData, showRecordLimitTip, customHeaderColor, abnormalStatus, newPreData)}}"
    pullFresh="{{pullFresh}}"
    coverify="{{false}}"
    noFakeHeight="{{utils.getNoFakeHeight(preData, tplId, caseId, showAddTpl, showMoreActionModal, isUserTpl, showRecordLimitTip, isSummaryCode, isHeadImgEmpty, tplEnableEditMode, isFromCaseTplCoded, newPreData)}}"
    showHomeIcon="{{(showHomeIcon || showHomepageIcon) && !hideHome}}"
    otherClickHook="{{otherClickHook}}"
    showBtnGroups="{{showBtnGroups}}"
    homeOtherBtn
    homePageUrl="{{homePageUrl}}"
    homePageText="首页"
    showIcon="{{!thirdIndex}}"
    currentFontSize="{{currentFontSize}}"
    fontSizeMsg="{{fontSizeMsg}}"
    isEditor="{{isEditor}}"
    soncodeEditPosition="{{soncodeEditPosition}}"
    enableEditMode="{{enableEditMode}}"
    bind:enableEditModeChange="handleEnableEditModeChange"
    tplId="{{tplId}}"
    childCodeEditAuthText="{{childCodeEditAuthText}}"
    hasTitle="{{utils.hasTitle(preData, newPreData)}}"
    listName="{{qrcodeRecord.list_name}}"
    forceEnableEditMode="{{forceEnableEditMode}}"
    isBgImgMode="{{isBgImgMode}}"
    outerContainerStyle="{{outerContainerStyle}}"
    innerContainerStyle="{{innerContainerStyle}}"
    bgImageWrapperStyle="{{bgImageWrapperStyle}}"
    bgImageStyle="{{bgImageStyle}}"
    bgImageSrc="{{bgImageSrc}}"
    gradientStyle="{{gradientStyle}}"
    maskStyle="{{maskStyle}}"
    isColorExtend="{{isColorExtend}}"
    homeToCode="{{homeToSummaryCode}}"
    headCmpInfo="{{headCmpInfo}}"
    isSummaryCode="{{isSummaryCode}}"
    isSkyline="{{isSkyline}}"
    customTextAlign="{{isSummaryCode && categoryType === 'normal_new' ? 'left' : null}}"
    titleMarginLeft="{{isSummaryCode && categoryType === 'normal_new' ? 125 : 121}}"
  >
    <view
      wx:if="{{isSummaryCode && categoryType === 'normal_new'}}"
      class="category-qrcode-count"
    >
<!--      {{ lang.code.total }}{{qrCodeCount}}{{ qrCodeCount == 1 ? lang.code.singularCode : lang.code.pluralCode}}-->
    </view>
  </customHeader>
  <customPCHeader
    showBtnGroups="{{showBtnGroups}}"
    showHomepageIcon="{{showHomepageIcon}}"
    hideHome="{{hideHome}}"
    homeToCode="{{homeToSummaryCode}}"
    showHomeIcon="{{(showHomeIcon || showHomepageIcon) && !hideHome}}"
    showIcon="{{!thirdIndex}}"
    homePageUrl="{{homePageUrl}}"
    homePageText="首页"
    homeOtherBtn
    blackReturn="{{utils.getBlackReturn(preData, newPreData)}}"
  ></customPCHeader>

  <view class="missingTip" wx:if="{{code40206 && abnormalStatus != 0}}">
    当前访问量过大，部分功能暂不可用，请刷新重试。
  </view>
  <block
    wx:if="{{abnormalStatus === 1 && !cardsLoading}}"
  >
    <view
      id="abnormalRecord"
      class="abnormalRecord {{headCmpInfo.isVerticalCenter ? 'is-vertical-center' : ''}} {{isCardStyle ? 'is-card-style' : ''}}"
      style="{{utils.getPageWrapperBgColor(categoryType, isOpenedSearch, isCodeEmpty, cardsLoading, preData, 'abnormalRecord', showMsgList, newPreData ,contentCount)}} {{isEdit ? 'padding-bottom: 50px;' : ''}} {{showMsgList && headCmpInfo.isVerticalCenter ? 'margin-top:-' + headerHeight + 'px;' : ''}}"
    >
      <!--
        margin-top: -1px;是为了修复某些安卓机型下 下拉时出现的白线 勿删
        padding-top: 2px;是为了防止头部如头部图片被切掉。勿删
      -->
      <view
        wx:if="{{!isSummaryCode}}"
        class="x-head-wrapper"
        bindtap="codeTopAreaClick"
        style="{{utils.getHeadWrapperStyle(categoryType, isOpenedSearch, isCodeEmpty, preData, newPreData)}}"
      >
        <view
          class="caseTplTip {{utils.getTipClass(preData, newPreData)}}"
          wx:if="{{((tplId && !tplEnableEditMode) || caseId) && !showAddTpl && !showMoreActionModal && !isUserTpl}}"
          bindtap="knowMoreBatchTpl"
          hover-class="itemHover"
        >
          <!--<view class="caseTitle">你正在预览使用模板生成的子码效果</view>
          <view class="caseSubTitle">批量模板支持批量生码及批量管理，可随时修改模板，复用模板新增等</view>-->
          <view class="caseTitle">如需修改模板或批量建码，可前往电脑端操作</view>
          <view class="caseLink">
            了解详情<i class="clifont anticon-cli-angle-right"></i>
          </view>
        </view>
        <!--<view
          wx:if="{{tplId && !tplEnableEditMode && isUserTpl}}"
          class="topDesc {{utils.getTipClass(preData, newPreData)}}"
          bindtap="knowMoreBatchTpl"
          hover-class="itemHover"
        >
          <block
            wx:if="{{(isUserTpl === 'false') || (isUserTpl === false)}}"
          >
            <view class="topDesctitle">手机端可修改示例内容，生一个码试试</view>
            <view class="topDescsubTitle">修改模板内容，批量生码，可前往电脑端</view>
            <view class="topDescLink">
              了解详情<i class="clifont anticon-cli-angle-right"></i>
            </view>
          </block>
          <block
            wx:else
          >
            <view class="topDesctitle">手机端仅可输入黄色高亮字段生码，可前往电脑端，修改模板内容，批量生码</view>
            <view class="topDescsubTitle">模板支持批量生码与管理，复用模板新增等</view>
            <view class="topDescLink">
              了解详情<i class="clifont anticon-cli-angle-right"></i>
            </view>
            &lt;!&ndash;<view class="topTitle">可前往电脑端，自定义编辑模板</view>
            <view class="linkWrapper">
              <view class="label">输入网址：</view>
              <view class="link">cli.im</view>
              <view class="label">百度搜索：</view>
              <view class="link">草料二维码</view>
            </view>&ndash;&gt;
          </block>
        </view>-->
        <!--<view
          wx:if="{{tplId && tplEnableEditMode && (!isUserTpl || isFromCaseTplCoded)}}"
          class="topDesc is-case-tpl {{systemClass}} {{utils.getTipClass(preData, newPreData)}}"
        >
          <view class="line line1">
            提示：
          </view>
          <view class="line line2">
            点击页面的 <text style="color:#f57c00;">修改</text> 替换内容，生成二维码
          </view>
          <view class="line line3">
            如需修改其他内容，都可前往电脑端修改模板
          </view>
        </view>-->
        <view wx:if="{{showRecordLimitTip}}" class="addRecordLimitInfo fixed {{preData.isTopImg ? 'isTopImage' : ''}}">
          <block wx:if="{{managerText}}">
            {{managerText}}
          </block>
          <block wx:else>
            只允许使用扫一扫方式填写，你当前{{openCodeText}}打开，无权填写，请用微信扫一扫打开
          </block>
        </view>
        <view wx:if="{{showRecordLimitTip}}" class="addRecordLimitInfo placeholder {{preData.isTopImg ? 'isTopImage' : ''}}">
          <block wx:if="{{managerText}}">
            {{managerText}}
          </block>
          <block wx:else>
            只允许使用扫一扫方式填写，你当前{{openCodeText}}打开，无权填写，请用微信扫一扫打开
          </block>
        </view>
        <!-- 头部组件 -->
        <headRecord
          wx:if="{{hasData && hasPreData && !isSummaryCode}}"
          wrapper-class="x-headRecord-wrapper {{headImageStyle ? 'x-imageStyle' + headImageStyle : ''}}"
          id="headRecord"
          qrcodeTopComponent="{{qrcodeTopComponent}}"
          codeTitleFormat="{{codeTitleFormat}}"
          qrcodeRecord="{{qrcodeRecord}}"
          logMsg="{{logMsg}}"
          editionMsg="{{editionMsg}}"
          orgMsg="{{orgMsg}}"
          isRecordCode="{{isRecordCode}}"
          password="{{password}}"
          bind:setOnShow="setOnShow"
          bind:setOnPageScroll="setOnPageScroll"
          expandLog="{{expandLog}}"
          accreditOrNot="{{accreditOrNot}}"
          needAuth="{{!recordAuth}}"
          isTplCode="{{isTplCode}}"
          needTipShow="{{!(isRecordCode && recordMsg && recordMsg.data_list && recordMsg.data_list.length != 0)}}"
          isComponentEmpty="{{isComponentEmpty}}"
          bind:authRecord="authRecord"
          cliUser="{{cliUser}}"
          hasOrgDest="{{hasOrgDest}}"
          isCodeEmpty="{{isCodeEmpty}}"
          hasHeadCode="{{hasHeadCode}}"
          isDownloadCode="{{isDownloadCode}}"
          downloadFileUrl="{{downloadFileUrl}}"
          allImg="{{allImg}}"
          imageInfos="{{imageInfos}}"
          webUrl="{{webUrl}}"
          bind:getPreData="getPreData"
          hasRichText="{{hasRichText}}"
          bottomColor="{{bottomColor}}"
          showRecordOperate="{{preData.showRecordOperate}}"
          preData="{{preData}}"
          statusList="{{statusList}}"
          tasksList="{{tasksList}}"
          bind:updateAuthInfo="updateAuthInfo"
          isEditor="{{isEditor}}"
          soncodeEditPosition="{{soncodeEditPosition}}"
          enableEditMode="{{enableEditMode}}"
          tplEnableEditMode="{{tplEnableEditMode}}"
          recordSummaryStatus="{{recordSummaryStatus}}"
          fileReadList="{{fileReadList}}"
          bind:setHeaderCoverify="setHeaderCoverify"
          stateShowMode="{{stateShowMode}}"
          isOpenNotary="{{isOpenNotary}}"
          isNotaryShown="{{showSubCodeNotary}}"
          notaryData="{{notaryData}}"
          fieldMap="{{fieldMap}}"
          fontSizeMsg="{{fontSizeMsg}}"
          currentFontSize="{{currentFontSize}}"
          isUserTpl="{{isUserTpl}}"
          isFromCaseTplCoded="{{isFromCaseTplCoded}}"
          isCardStyle="{{isCardStyle}}"
          showMsgList="{{showMsgList}}"
          isColorExtend="{{isColorExtend}}"
          isDarkBgColor="{{isDarkBgColor}}"
          isBgImgMode="{{isBgImgMode}}"
          isContentVisible="{{isContentVisible}}"
          headCmpInfo="{{headCmpInfo}}"
          titles="{{titles}}"
          titleIsPlaceholder="{{titleIsPlaceholder}}"
          titleHtml="{{titleHtml}}"
          headType="{{headType}}"
          moduleMsg="{{moduleMsg}}"
          topStyle="{{topStyle}}"
          isSkyline="{{isSkyline}}"
        >
          <view slot="statusPanelTop" id="statusPanelTop" />
        </headRecord>
        <!-- 动态档案 -->
        <!-- 记录内容展示 -->
        <view
          wx:if="{{headCmpInfo.isRecordOperateWrapperShow}}"
          class="recordOperateWrapper"
        >
          <recordOperate
            id="recordOperate"
            dataList="{{recordMsg.data_list}}"
            msgTag="{{logMsgTag}}"
            backFromPhone="{{backFromPhone}}"
            currentURL="{{currentURL}}"
            recordColorInfo="{{preData.codeColorInfo}}"
            recordMsg="{{recordMsg}}"
            orgId="{{orgMsg.id}}"
            isRecordCode="{{isRecordCode}}"
            password="{{password}}"
            recordPsw="{{recordPsw}}"
            bind:setOnShow="setOnShow"
            bind:setOnPageScroll="setOnPageScroll"
            expandLog="{{expandLog}}"
            accreditOrNot="{{accreditOrNot}}"
            needAuth="{{!recordAuth}}"
            editionMsg="{{editionMsg}}"
            bind:authRecord="authRecord"
            orgCode="{{orgMsg.coding}}"
            bind:setPaddingBottom="setPaddingBottom"
            bind:setHeaderCoverify="setHeaderCoverify"
            formAuth="{{recordMsg.visible_auth}}"
            noFormList="{{expandLog == 2 || expandLog == 3 || operateShowPos === OPERATE_POS.BodyBottom}}"
            codeId="{{recordId}}"
            recordSummaryStatus="{{recordSummaryStatus}}"
            recordLogStatus="{{qrcodeRecord.log_status}}"
            recordAddStatus="{{qrcodeRecord.record_add_status}}"
            bind:updateRecordData="recordAuditUpdateData"
            bind:showNavModal="showNavModal"
            richShowRecordView="{{richShowRecordView}}"
            caseId="{{caseId}}"
            tplId="{{tplId}}"
            tasksList="{{tasksList}}"
            hasStatusList="{{!!statusList.length}}"
            needUa="{{needUa}}"
            codeFrom="{{codeFrom}}"
            bind:change="onRecordChange"
            codeReviewRecords="{{codeReviewRecords}}"
            bind:setReviewMsgInfo="setReviewMsgInfo"
            bind:setMemberInfo="setMemberInfo"
            bind:setShowCodeReview="setShowCodeReview"
            canSubscribed="{{canSubscribed}}"
            subscribeStatus="{{subscribeStatus}}"
            hasSubscribed="{{hasSubscribed}}"
            subscribeAuthInfo="{{subscribeAuthInfo}}"
            statusList="{{statusList}}"
            dynamicShowPos="{{DYNAMIC_POS.Head}}"
            fontSizeMsg="{{fontSizeMsg}}"
            currentFontSize="{{currentFontSize}}"
            operateShowPos="{{OPERATE_POS.Head}}"
            position="top"
            operateData="{{operateData}}"
            expandTplData="{{expandTplData}}"
            managerSkipAuth="{{managerSkipAuth}}"
            cmpInfo="{{headCmpInfo}}"
            summaryTitle="{{summaryTitle}}"
            isStatsStyle="{{isStatsStyle}}"
            hasDynamicViewAuth="{{hasDynamicViewAuth}}"
            styleType="{{styleType}}"
            isSkyline="{{isSkyline}}"
            isOrgDestQrcode="isOrgDestQrcode"
          />
          <view class="mask-record-tpl" wx:if="{{disableClickTpl}}"></view>
        </view>
      </view>
      <!-- 码内容展示 margin-top: {{-preData.codeColorInfo.gradient.bottomExtendHeight + 'px'}} -->
      <view
        wx:if="{{utils.hasContent(dataSize, hasPreData)}}"
        class="content-wrapper"
        style="margin-top: {{preData.codeColorInfo.type === 'pure' ? '' : (-preData.codeColorInfo.gradient.bottomExtendHeight + 'px')}} "
        bindtap="codeContentAreaClick"
      >
        <summaryAction
          wx:if="{{isSummaryCode}}"
          id="summaryAction"
          qrcodeRecord="{{qrcodeRecord}}"
          qrcodeCount="{{qrCodeCount}}"
          sort="{{summaryCodeSort}}"
          bind:setTitle="setCodeTitle"
          bind:hideTitle="hideCodeTitle"
          bind:search="onSummaryCodeSearch"
          bind:sort="onSummaryCodeSort"
          categoryType="{{categoryType}}"
          bind:changeCategoryType="changeCategoryType"
          bind:changeCategoryTitle="changeCategoryTitle"
          bind:openSearch="openSearch"
        />
        <codeListDivider
          wx:if="{{hasData && !renderFlash}}"
          id="codeListDivider"
          categoryType="{{categoryType}}"
          qrcodeRecord="{{qrcodeRecord}}"
          recordSummaryStatus="{{recordSummaryStatus}}"
          editionMsg="{{editionMsg}}"
          orgMsg="{{orgMsg}}"
          qrcodeCompontent="{{dataList}}"
          codeFresh="{{codeFresh}}"
          openId="{{openId}}"
          hided="{{hided}}"
          onPullDownRefresh="{{onPullDownRefresh}}"
          currentURL="{{currentURL}}"
          bind:toggleShowHeader="toggleShowHeader"
          recordColorInfo="{{preData.codeColorInfo}}"
          cliUser="{{cliUser}}"
          allImg="{{allImg}}"
          imageInfos="{{imageInfos}}"
          editPower="{{editPower}}"
          isEdit="{{isEdit}}"
          bind:setOnPageScroll="setOnPageScroll"
          bind:codeEditFresh="codeEditFresh"
          bind:transferData="transferData"
          bind:getEdit="getEdit"
          customColor="{{preData.codeColorInfo}}"
          hasTitle="{{!!preData.codeHeaderTitleInfo.title}}"
          hasRecord="{{preData.isRecordCode}}"
          hasRichText="{{hasRichText}}"
          bind:setOnShow="setOnShow"
          capacityInfo="{{capacityInfo}}"
          recordMsg="{{recordMsg}}"
          needAuth="{{!recordAuth}}"
          password="{{password}}"
          bind:updateRecordData="recordAuditUpdateData"
          codeType="{{codeType}}"
          bind:asyncRenderCompManual="asyncRenderCompManual"
          bind:saveRecordCode="saveRecordCode"
          summaryCodeCurPage="{{summaryCodeCurPage}}"
          summaryFilter="{{summaryFilter}}"
          summaryCodeLoading="{{summaryCodeLoading}}"
          isRefresh="{{isRefresh}}"
          caseId="{{caseId}}"
          tplId="{{tplId}}"
          accreditOrNot="{{accreditOrNot}}"
          recordPsw="{{recordPsw}}"
          isGradient="{{isGradient}}"
          isEditor="{{isEditor}}"
          soncodeEditPosition="{{soncodeEditPosition}}"
          enableEditMode="{{enableEditMode}}"
          tplEnableEditMode="{{tplEnableEditMode}}"
          fieldMap="{{fieldMap}}"
          isOpenedSearch="{{isOpenedSearch}}"
          fontSizeMsg="{{fontSizeMsg}}"
          currentFontSize="{{currentFontSize}}"
          bind:renderComplete="handleListRenderComplete"
          isBgImgMode="{{isBgImgMode}}"
          bind:visibleStatesChange="handleVisibleStatesChange"
          isColorExtend="{{isColorExtend}}"
          isDarkBgColor="{{isDarkBgColor}}"
          headCmpInfo="{{headCmpInfo}}"
          footCmpInfo="{{footCmpInfo}}"
          firstChunkSize="{{firstChunkSize}}"
          visibleStates="{{visibleStates}}"
          dataSize="{{dataSize}}"
          fileReadList="{{fileReadList}}"
          isSkyline="{{isSkyline}}"
          summaryType="{{summaryType}}"
        />
        <view
          wx:if="{{isEditor && soncodeEditPosition === 1}}"
          class="subCodeEdit"
          hover-class="subCodeEditHover"
          bind:tap="goEdit"
        >
          <text class="clifont anticon-edit" />
          编辑
        </view>
        <view
          class="loading rendering"
          wx:if="{{!isSummaryCode && !onPullDownRefresh && !isListRenderComplete}}"
        >
          <image
            class="loading-image"
            src="/assets/loading.gif"
          />
        </view>
      </view>
      <!-- 动态档案 -->
      <!-- 记录内容展示 -->
      <!-- 底部recordOperate隐藏逻辑: 悬浮按钮、开启评论、头部卡片样式、无码内容, 动态档案不在正文下方 -->
      <view
        wx:if="{{footCmpInfo.isRecordOperateWrapperShow && (!utils.hasContent(dataSize, hasPreData) || isListRenderComplete)}}"
        class="recordOperateWrapper underContent"
        style="margin-top:32px;{{utils.hiddenBottomRecordOperate(isRecordCode, recordAddStatus, expandLog, isEdit, cardsLoading, msgIntial, showMsgList, showMsg, isCodeEmpty, footCmpInfo.isRecordCheckShow, dynamicShowPos, headCmpInfo.hasStatus, tasksList.length, operateMsg) ? 'display:none;' : ''}}"
      >
        <recordOperate
          id="recordOperate"
          dataList="{{recordMsg.data_list}}"
          msgTag="{{logMsgTag}}"
          backFromPhone="{{backFromPhone}}"
          currentURL="{{currentURL}}"
          recordColorInfo="{{preData.codeColorInfo}}"
          recordMsg="{{recordMsg}}"
          orgId="{{orgMsg.id}}"
          isRecordCode="{{isRecordCode}}"
          password="{{password}}"
          recordPsw="{{recordPsw}}"
          bind:setOnShow="setOnShow"
          bind:setOnPageScroll="setOnPageScroll"
          expandLog="{{expandLog}}"
          accreditOrNot="{{accreditOrNot}}"
          needAuth="{{!recordAuth}}"
          editionMsg="{{editionMsg}}"
          bind:authRecord="authRecord"
          orgCode="{{orgMsg.coding}}"
          bind:setPaddingBottom="setPaddingBottom"
          bind:setHeaderCoverify="setHeaderCoverify"
          formAuth="{{recordMsg.visible_auth}}"
          noFormList="{{expandLog == 2 || expandLog == 3 || operateShowPos === OPERATE_POS.Head}}"
          codeId="{{recordId}}"
          recordSummaryStatus="{{recordSummaryStatus}}"
          recordLogStatus="{{qrcodeRecord.log_status}}"
          recordAddStatus="{{qrcodeRecord.record_add_status}}"
          bind:updateRecordData="recordAuditUpdateData"
          bind:showNavModal="showNavModal"
          richShowRecordView="{{richShowRecordView}}"
          caseId="{{caseId}}"
          tplId="{{tplId}}"
          tasksList="{{tasksList}}"
          hasStatusList="{{!!statusList.length}}"
          needUa="{{needUa}}"
          codeFrom="{{codeFrom}}"
          bind:change="onRecordChange"
          codeReviewRecords="{{codeReviewRecords}}"
          bind:setReviewMsgInfo="setReviewMsgInfo"
          bind:setMemberInfo="setMemberInfo"
          bind:setShowCodeReview="setShowCodeReview"
          canSubscribed="{{canSubscribed}}"
          subscribeStatus="{{subscribeStatus}}"
          hasSubscribed="{{hasSubscribed}}"
          subscribeAuthInfo="{{subscribeAuthInfo}}"
          statusList="{{statusList}}"
          dynamicShowPos="{{DYNAMIC_POS.Body}}"
          operateShowPos="{{OPERATE_POS.BodyBottom}}"
          afterContent="{{utils.hasContent(dataSize, hasPreData) && !isColorExtend}}"
          position="bottom"
          fontSizeMsg="{{fontSizeMsg}}"
          currentFontSize="{{currentFontSize}}"
          operateData="{{operateData}}"
          expandTplData="{{expandTplData}}"
          managerSkipAuth="{{managerSkipAuth}}"
          isCodeEmpty="{{isCodeEmpty}}"
          cmpInfo="{{footCmpInfo}}"
          summaryTitle="{{summaryTitle}}"
          isStatsStyle="{{isStatsStyle}}"
          hasDynamicViewAuth="{{hasDynamicViewAuth}}"
          styleType="{{styleType}}"
          isSkyline="{{isSkyline}}"
        />
        <view class="mask-record-tpl" wx:if="{{disableClickTpl}}"></view>
      </view>

      <!-- 补个间距 -->
      <view
        wx:if="{{showMsgList && !isCodeEmpty}}"
        class="footer-padding-el"
        style="padding-top:{{footerPaddingTop}}px;"
      />
    </view>
    <!-- 快速协作动态区域 -->
    <!-- wx:if 仅控制加载时机 -->
    <message-list
      wx:if="{{!utils.hasContent(dataSize, hasPreData) || isListRenderComplete}}"
      id="message-list"
      codeId="{{recordId}}"
      hideTopGap="{{headCmpInfo.isVerticalCenter}}"
      isSkyline="{{isSkyline}}"
      scrollId="{{messageListScrollId}}"
    >
      <view slot="latestItemPos" id="latestItemPos" />
      <view slot="scroll" id="{{messageListScrollId}}" />
    </message-list>
    <!-- 企业主页以及收藏、投诉、更多操作 -->
    <view
      wx:if="{{hasData && preData.codeColorInfo && (!utils.hasContent(dataSize, hasPreData) || isListRenderComplete)}}"
      class="clearfix companyIntroContent"
      id="companyIntro"
      style="padding-top:{{footerPaddingTop}}px;padding-bottom:{{isIphoneX ? '34px' : '24px'}};{{contentCount === 0 && isSummaryCode && categoryType === 'normal_new'?'background-color: #fff':'' }}"
    >
      <view
        wx:if="{{orgMsg.org_dest_qrcode_route && !isOrgDestQrcode && showOrgCode}}"
        hover-class="none"
        class="companyIntro"
        style="{{orgMsg.auth_status == 4 ? 'min-height:148px' : 'min-height:110px;'}}{{orgMsg.logo_path ? '' : 'padding-right:20px;'}};background:#fff;"
        data-url="/pages/code/code?q={{orgMsg.org_dest_qrcode_route}}"
        bind:tap="goToUrl"
      >
        <image
          wx:if="{{orgMsg.logo_path}}"
          class="companyLogo"
          src="{{orgMsg.logo_path}}"
          mode="aspectFill"
        />

        <image
          wx:if="{{orgMsg.auth_status == 4 && orgMsg.logo_path}}"
          class="companyAuth"
          src="https://static.clewm.net/cli/images/mina-cli/mina_isAuth@2x.png"
        />
        <view class="companyName" style="{{orgMsg.name ? '' : 'color: #bbb;'}}">
          {{orgMsg.name || '企业名称未输入'}}
          <image
            mode="aspectFit"
            wx:if="{{ !orgMsg.logo_path && orgMsg.auth_status == 4 }}"
            style="width: 60px; height: 20px;position: relative; top: 5px;"
            src="https://static.clewm.net/cli/images/mina-cli/mina_isAuth@2x.png"
          />
        </view>
        <view
          wx:if="{{orgMsg.memo}}"
          class="companyContent"
        >{{orgMsg.memo}}</view>
        <div class="companyLink">点击了解详情</div>
      </view>
      <block
        wx:if="{{!isEdit && !caseId}}"
      >
        <view class="bottom-collect-card" wx:if="{{ show_collect == 2 }}">
          <p class="bottom-collect-card-tips">{{ lang.code.collectGuideTip }}</p>
          <view class="bottom-collect-card-button" wx:if="{{!collectStatus}}" bindtap=" ">
            {{ lang.code.favorite }}
          </view>
          <view class="bottom-collect-card-button bottom-collect-success" wx:else bindtap="cancelCollect">
            {{ lang.code.deFavorite }}
          </view>
        </view>
        <view
          wx:if="{{utils.hasFooterBetween(show_collect, show_share, abnormalStatus, hasData, hideViewShow, show_powered_by, isRecordCode, shouldShowComplain, isEditor, isCodeManager, isCodeSubManager, tplQrcodeStatus, isSummaryCode, showManage)}}"
          class="footer-between"
          style="margin-bottom: 32px;"
        >
          <span class="footer-between-content" style="border-color: {{bottomColor.borderColor}}">
            <view
              class="action-btn collect-btn bottom-collect"
              hover-class="{{bottomColor.isLight ? 'share-collect-btn-hover-light' : 'share-collect-btn-hover-dark'}}"
              bindtap="collectCode"
              wx:if="{{!collectStatus && show_collect == 1}}"
              style="color: {{ bottomColor.textColor }};border-color: {{ bottomColor.defaultColor }};{{show_share != 1 ? 'border-radius: 22px' : ''}}"
            >
              <span>
                <text
                  class="clifont anticon--"
                  style="margin-top: {{ isAndroid ? '-4px' : '-3px;' }}"
                />
                <view wx:if="{{isSkyline}}" style="width:4px;" />
                <text style="position: relative; top: 0; padding-left: 4px;">{{ lang.code.favorite }}</text>
              </span>
            </view>
            <view
              class="action-btn collect-btn bottom-collect-success"
              hover-class="{{bottomColor.isLight ? 'share-collect-btn-hover-light' : 'share-collect-btn-hover-dark'}}"
              bindtap="cancelCollect"
              wx:if="{{collectStatus && show_collect == 1}}"
              style="color: {{ bottomColor.textColor }};border-color: {{bottomColor.defaultColor}};{{show_share != 1 ? 'border-radius: 22px' : ''}}"
            >
              <span>
                <text
                  class="clifont anticon-_collect-bottom-on"
                  style="margin-top: {{isIos ? '-2px' : '-2px'}}"
                />
                <view wx:if="{{isSkyline}}" style="width:4px;" />
                <text style="position: relative; top: {{ isAndroid ? '0' : '1px' }}; padding-left: 4px;">{{ lang.code.deFavorite }}</text>
              </span>
            </view>
            <view
              wx:if="{{show_collect == 1 && show_share == 1}}"
              class="share-collect-btn-split"
              style="background-color: {{bottomColor.isLight ? bottomColor.borderColor : 'rgba(255, 255, 255, 0.13)'}}"
            ></view>
            <view
              class="action-btn share-btn"
              hover-class="{{bottomColor.isLight ? 'share-collect-btn-hover-light' : 'share-collect-btn-hover-dark'}}"
              wx:if="{{show_share == 1}}"
              bindtap="handleShareBtnClick"
              style="color: {{bottomColor.textColor}};border-color: {{bottomColor.defaultColor}};{{show_collect != 1 ? 'border-radius: 22px' : ''}};"
            >
              <span>
                <text
                  class="clifont anticon-share-bottom-new"
                  style="margin-top: -2px;"
                />
                <view wx:if="{{isSkyline}}" style="width:4px;" />
                <text style="position: relative; top: 0; padding-left: 4px;">{{ lang.code.share }}</text>
              </span>
            </view>

            <view
              wx:if="{{(show_collect == 1 || show_share == 1) }}"
              class="share-collect-btn-split"
              style="background-color: {{bottomColor.isLight ? bottomColor.borderColor : 'rgba(255, 255, 255, 0.13)'}}"
            ></view>

            <!-- bindtap="codeMgrDetail" -->
            <!-- *原更多按钮 -->
            <!-- <view
              class="action-btn more-btn"
              hover-class="{{bottomColor.isLight ? 'share-collect-btn-hover-light' : 'share-collect-btn-hover-dark'}}"
              wx:if="{{abnormalStatus == 1 && hasData && !hideViewShow && !isSummaryCode && (show_powered_by == 1 || isRecordCode || (show_powered_by != 1 && shouldShowComplain == 1) || (isEditor || ((isCodeManager || isCodeSubManager) && tplQrcodeStatus !== 2 && tplQrcodeStatus !== 4 && !isSummaryCode)) || isEditor)}}"
              style="color: {{bottomColor.textColor}};border-color: {{bottomColor.defaultColor}};{{show_collect != 1 ? 'border-radius: 22px' : ''}};"
              bindtap="showMoreActionModal"
            >
              <icon
                class="clifont anticon-more"
                style="margin-top: -2px;"
              />
              <text style="position: relative; top: 0; padding-left: 4px;">{{lang.common.more}}</text>
            </view> -->
            <!-- <mobile-auth-button
              transparent-model
              penetration="{{hasRegister}}"
              bindAfterRegister="afterRegister"
              register-after-got-phone-number
              register-loading
            > -->
              <!-- skip-user-protocol-verify -->
              <view
                wx:if="{{utils.hasCodeMange(tplQrcodeStatus, isSummaryCode, showManage)}}"
                class="action-btn more-btn"
                hover-class="{{bottomColor.isLight ? 'share-collect-btn-hover-light' : 'share-collect-btn-hover-dark'}}"
                style="color: {{bottomColor.textColor}};border-color: {{bottomColor.defaultColor}};{{show_collect != 1 ? 'border-radius: 22px' : ''}}; display: flex; align-items: center; justify-content: center;"
                bindtap="getUserRoleType"
              >
                <span>
                  <text class="clifont anticon-more" />
                  <view wx:if="{{isSkyline}}" style="width:4px;" />
                  <text style="position: relative; top: 0; padding-left: 4px;">{{lang.common.more || '更多'}}</text>
                </span>
              </view>
            <!-- </mobile-auth-button> -->
          </span>
        </view>
        <block wx:if="{{editionMsg.edition_id === 100}}">
          <view
            class="single-footer"
            id="powerby"
            wx:if="{{abnormalStatus == 1 && hasData && !hideViewShow}}"
            style="color: {{ bottomColor.defaultColor }};position: relative;">
            <view bindtap="trialPoweredBy" style="display: inline-block;">正在试用草料二维码</view>
            <view
              class="powerby-link"
              bindtap="trialPoweredBy"
              style="color: {{ bottomColor.textColor }}"
            >旗舰版</view>
          </view>
        </block>
        <block wx:else>
          <view
            class="single-footer"
            id="powerby"
            wx:if="{{abnormalStatus == 1 && hasData && !hideViewShow && show_powered_by == 1}}"
            style="color: {{ bottomColor.defaultColor }};position: relative;">
            <block wx:if="{{isSpecialCode}}">
              <view
                class="protect-link"
                bindtap="protectJump"
                style="color: {{ bottomColor.textColor }};font-size:{{fontSizeMsg.fontSize12}}"
              >
                <view>{{lang.code.protect}}</view>
                <icon class="clifont anticon-cli-angle-right {{systemClass}}" />
              </view>
            </block>
            <block wx:else>
              <block wx:if="{{ hasData && preData.codeColorInfo && (!utils.hasContent(dataSize, hasPreData) || isListRenderComplete)}}">
                <!-- 普通免费用户创建的码 -->
                <template is="powerBy" data="{{ isLight:bottomColor.isLight,powerbyVersion,isWarnCode,lang,bottomColor,isChinese, isSkyline, powerbyAbVersion }}" />
              </block>
            </block>
          </view>
        </block>
        <!--wx:if="{{abnormalStatus == 1 && hasData && (show_powered_by || shouldShowComplain)}}"-->
        <view
          style="display: block;width: 100%;text-align: right;height: 44px;margin-top:-32px"
          wx:if="{{utils.hasComplaint(show_collect, show_share, abnormalStatus, hasData, hideViewShow, show_powered_by, isRecordCode, shouldShowComplain, isEditor, isCodeManager, isCodeSubManager, tplQrcodeStatus, isSummaryCode, showManage)}}"
        >
          <view wx:if="{{!isWarnCode}}">
            <view
              class="footerBtn"
              bindtap="complaintAction"
              style="color:{{bottomColor.defaultColor}};width:auto;"
            >
              <!-- 右下角投诉按钮 -->
              {{ lang.code.report }}
            </view>
          </view>
        </view>
        <view
          wx:if="{{validRadius || validStartTime}}"
          style="color: {{ bottomColor.defaultColor }}"
          class="valid-footer">
          该二维码可在「
          <view wx:if="{{validRadius}}">{{validAddress}}附近{{validRadius}}</view>
          <view wx:if="{{validStartTime && validEndTime}}">{{validStartTime}}-{{validEndTime}}</view>
          」访问
        </view>
      </block>
    </view>

    <!-- 快速协作操作区域 -->
    <!-- hidePlaceholder: 除表单悬浮外的其他悬浮情况 -->
    <message
      id="message"
      codeId="{{recordId}}"
      hidePlaceholder="{{utils.isInEditMode(isEditor, soncodeEditPosition, enableEditMode) || (((tplId && !tplEnableEditMode) || caseId) && !showAddTpl && !showMoreActionModal)}}"
      bind:msgInitial="onMsgInitial"
      isSkyline="{{isSkyline}}"
    />
  </block>
  <!-- 收藏成功弹窗 -->
  <block wx:if="{{collectTip}}">
    <view class="collectBg" bindtap="cancelTips" catchtouchmove="catchCollect">
      <view
        class="collectContent"
      >
        <view>
          <view class="title" style="{{isAndroid ? 'font-size: 15px' : ''}}">{{lang.code.collectTitle}}</view>
          <image class="cardTips" mode="widthFix" src="{{appid == 'wx5db79bd23a923e8e' ? lang.code.collectedCliImgTips : lang.code.collectedNeutralImgTips}}"></image>
          <view class="collectedConfirmedTip" style="{{isAndroid ? 'font-size: 15px' : ''}}">{{appid == 'wx5db79bd23a923e8e' ? lang.code.collectCardTips : lang.code.collectCardNeutralTips}}</view>
          <view class="collectConfirmed" hover-class="collectConfirmedHover" bindtap="cancelTips" style="{{isAndroid ? 'font-size: 15px' : ''}}">{{lang.code.collectedConfirmedText}}</view>
        </view>
      </view>
    </view>
  </block>
  <block wx:if="{{showWXFavGuide}}">
    <view
      class="collectBg {{minaType === 'third' ? 'collectThirdBg' : ''}}"
      bindtap="hideWXFavGuide"
    >
      <view class="wxFavGuidContent" style="transform: scale({{ scaleHeight }})">
        <block wx:if="{{minaType !== 'third'}}">
          <view class="suc-title" style="margin-top: {{menuButtonRectBottom + 10 + 20}}px">{{lang.code.wxFavSuccess}}</view>
          <view class="sub-desc">在「<text class="t-orange">{{lang.code.wxFavGuideText5}}</text>」</view>
          <view class="sub-desc">{{lang.code.wxFavGuideText4}}</view>
          <view class="wxFavImg">
            <image
              class="wxFavGuide"
              src="https://gstatic.clewm.net/caoliao-resource/240402/a44fa4_7756ccdb.png"
              mode="aspectFit"
            ></image>
            <image
              class="wxFavGuideLine"
              src="https://gstatic.clewm.net/caoliao-resource/240409/a44fa4_540e9fd6.png"
              mode="aspectFit"
            ></image>
          </view>

          <view class="suc-title">{{lang.code.wxFavOtherWay}}</view>
        </block>
        <view class="sub-desc" style="margin-top: {{minaType === 'third' ? (menuButtonRectBottom + 10 + 20) : 0}}px">
          {{lang.code.wxFavGuideText1}}「
          <image
            class="wxFavGuideThree"
            src="https://gstatic.clewm.net/caoliao-resource/240402/a44fa4_3ab719c2.png"
            mode="aspectFit"
          ></image>
          」，{{lang.code.wxFavGuideText2}}「<text class="t-orange">{{lang.code.favorite}}</text>」{{lang.code.wxFavGuideText6}}</view>
        <view class="sub-desc">{{lang.code.wxFavGuideText7}}「<text class="t-orange">{{lang.code.wxFavGuideText3}}</text>」{{lang.code.wxFavGuideText8}}</view>
        <view class="wxFavImg">
          <image
            class="wxFavGuide"
            src="https://gstatic.clewm.net/caoliao-resource/240402/a44fa4_c9019606.png"
            mode="aspectFit"
          ></image>
          <image
            class="wxFavGuideLine"
            src="https://gstatic.clewm.net/caoliao-resource/240409/a44fa4_540e9fd6.png"
            mode="aspectFit"
          ></image>
        </view>
        <view class="suc-btn">{{lang.code.collectedConfirmedText}}</view>

        <!--<view class="wxFavGuideText" style="top: {{menuButtonRectBottom + 10 + 60}}px">
          <view class="line1">
            {{lang.code.wxFavGuideText1}}
          </view>
          <view class="line2">
            {{lang.code.wxFavGuideText2}}
          </view>
        </view>-->
      </view>
    </view>
  </block>
  <cardModal
    id="cardModal"
    wx:if="{{showCard}}"
    shareName="{{shareName}}"
    caseBg="{{caseBg}}"
    codeUrl="{{currentURL}}"
    shareCodeUrl="{{shareCodeUrl}}"
    from="preview"
    bind:saveClick="saveClick"
  />
  <!--<root-portal>-->
  <block wx:if="{{abnormalStatus === 1 && !cardsLoading}}">
    <view
      class="saveEditBg"
      wx:if="{{isEdit}}"
    >
      <view
        class="cancelEdit"
        bindtap="cancelEdit"
      >
        {{lang.code.cancel}}
      </view>
      <view
        class="saveEdit"
        bindtap="saveEdit"
        style="background:{{editBtnBg}}"
      >
        {{saveTips}}
      </view>
    </view>
  </block>
  <!--</root-portal>-->
  <view
    wx:if="{{abnormalStatus == 0 || cardsLoading}}"
    class="loading is-float"
    style="top:{{utils.getCustomHeaderHeight(statusBarHeight) - 1}}px;"
  >
    <image
      class="loading-image"
      src="/assets/loading.gif"
    />
  </view>
  <!-- 加载失败页面 -->
  <view
    class="failLoad"
    wx:if="{{abnormalStatus == 4}}"
  >
    <image
      style="left: 60px;"
      class="deleted-image"
      src="https://static.clewm.net/cli/images/mina-cli/router@2x.png"
    />
    <view class="deleted-tips">加载失败，请检查网络后重试</view>

    <button
      bindtap="handleReloadBtnClick"
      class="failLoad-button"
    >重新加载</button>

    <view style="color: #357bb3" class="fail-load-btn-link" bindtap="toFeedback">问题反馈</view>
  </view>
  <!-- 码不存在 -->
  <view
    wx:if="{{abnormalStatus == 35}}"
    class="not-exist"
  >
    <icon class="not-exist-icon" type="info_circle" size="40" color="#166BC7" />
    <view class="not-exist-title">访问路径无资源</view>
    <view class="not-exist-desc">请仔细确认路径URL是否正确</view>
  </view>
  <!-- 码被删除页 -->
  <view
    class="deleted"
    wx:if="{{abnormalStatus == 2}}"
  >
    <image
      class="author-deleted"
      src="https://static.clewm.net/cli/images/mina-cli/mina_is_deleted@2x.png"
    />
    <view class="deleted-tips">抱歉，当前二维码已被制作者删除</view>
  </view>
  <!-- 码被删除页 -->
  <view
    class="not-variable"
    wx:if="{{abnormalStatus == 3 && (auditReason.id === 9 || auditReason.id === 10)}}"
  >
    <image
      class="not-variable-image"
      src="https://static.clewm.net/cli/images/mina-cli/not_available@2x.png"
    />
    <view class="not-variable-tips">
      {{ auditReason.id === 9 ? '该码当前访问量过大' : '该二维码已停止访问' }}
    </view>
    <view class="not-variable-desc" wx:if="{{auditReason.id === 9}}">
      你可以稍后进行访问
    </view>
  </view>
  <!-- 审核违规页 -->
  <view
    class="outline"
    wx:if="{{abnormalStatus == 3 && auditReason.id !== 9 && auditReason.id !== 10}}"
  >
    <reviewViolation auditReason="{{auditReason}}" />
  </view>
  <!-- 高频访问页 -->
  <view
    class="deleted"
    wx:if="{{abnormalStatus == 288}}"
  >
    <image
      class="deleted-image"
      src="https://static.clewm.net/cli/images/mina-cli/audit_fail@2x.png"
      style="width: 205px;height: 178px;"
    />
    <view class="deleted-tips">该二维码访问频繁，请稍后重试</view>
  </view>
  <view
    class="deleted"
    wx:if="{{abnormalStatus == 5}}"
  >
    <image
      class="deleted-image"
      src="https://static.clewm.net/cli/images/mina-cli/mina_check.png"
    />
    <view class="deleted-tips">该页面达到499次访问上限</view>
    <view class="deleted-tips">需要审核通过之后才能继续访问</view>
    <view class="fusing-tips">如需加快审核，请联系：service@nears.cn</view>
  </view>
  <!-- 二维码有效期校验失败提示 -->
  <view class="valid"  wx:if="{{abnormalStatus == 6}}">
    <image class="valid-img" src="{{valid_img}}" />
    <view class="valid-title" wx:if="{{hasExpired}}">当前日期无法查看二维码</view>
    <view class="valid-title" wx:else>当前日期无法查看二维码</view>
    <view class="valid-info">
      <view wx:if="{{hasExpired}}">该二维码制作者设置查看有效期截至{{endTime}}</view>
      <view class="valid-date-info" wx:else>
        <text>该二维码制作者设置查看有效期为</text>
        <text>{{startTime}}至{{endTime}}</text>
      </view>
    </view>
  </view>
  <!-- 二维码打开方式校验提示 -->
  <view class="valid" wx:if="{{abnormalStatus == 7}}" >
    <image class="valid-img" src="{{valid_img}}" />
    <view class="valid-title">二维码无法查看</view>
    <view class="valid-info">
      <view>该二维码制作者设置不允许“{{validOpenMethod}}”打开</view>
    </view>
  </view>
  <!-- 二维码打开时间校验 -->
  <!-- <view class="valid" wx:if="{{abnormalStatus == 8}}" >
    <image class="valid-img" src="{{valid_img}}" />
    <view class="valid-title">当前时段无法查看二维码</view>
    <view class="valid-info open-time">
      <view>该二维码制作者设置"每天{{validStartTime}}-{{validEndTime}}</view>
      <view wx:if="{{validAddress && validRadius}}">、{{validAddress}}附近{{validRadius}}</view>
      <view wx:if="{{validPsdStatus}}">、输入密码</view>
      <view>"查看</view>
    </view>
    <view wx:if="{{showSkipLimitInfo}}" style="color:#9b9b9b; margin-top:32px;font-size: 12px;">
      {{skipLimitInfo.showText}}，<text class="cliLink" catch:tap="skipAuthLimit">继续访问</text>
      <render-trigger bind:renderCall="logOnUserCanSkipLimit" />
    </view>
  </view> -->
  <!-- 二维码地理位置校验 -->
  <view
    wx:if="{{abnormalStatus == 9 || abnormalStatus == 8}}"
    class="valid"
    style="position:static;transform:none;"
  >
    <!--<image class="valid-img" src="{{valid_img}}" />
    <view class="valid-title">当前地理位置无法查看二维码</view>
    <view class="valid-info open-location">
      <view>该二维码制作者设置"</view>
      <view wx:if="{{validStartTime && validEndTime}}">每天{{validStartTime}}-{{validEndTime}}、</view>
      <view>{{validAddress}}附近{{validRadius}}</view>
      <view wx:if="{{validPsdStatus}}">、输入密码</view>
      <view>"查看</view>
    </view>
    <view class="reloadBtn" bindtap="reloadLocation">重新获取定位</view>-->
    <view class="rule-info-page">
      <view
        class="rule-info-loading-wrapper"
        wx:if="{{ruleInfo.loading}}"
      >
        <image
          class="rule-info-loading-image"
          src="/assets/loading.gif"
        />
      </view>
      <!-- done: type不写, 改为icon传入 -->
      <mp-msg
        ext-class="rule-info-rule-mp-msg rule-info-{{ruleInfo.info.msgType}}-mp-msg {{!show_powered_by ? 'rule-info-no-footer-mp-msg' : ''}}"
        title="{{ruleInfo.codeViewOnly ? null: ruleInfo.info.title}}"
        type="{{ruleInfo.codeViewOnly ? null : (ruleInfo.info ? 'warn' : '')}}"
        color="{{ruleInfo.info.theme}}"
        cusotm_icon="{{ruleInfo.codeViewOnly}}"
        fontSizeMsg="{{ruleInfo.fontSizeMsg}}"
      >
        <view slot="icon" class="rule-info-customIcon">
          <image wx:if="{{ruleInfo.showLogoIcon}}" class="weui-msg__icon-img" src="{{ruleInfo.logoSrc}}" mode="aspectFit" />
          <text wx:else class="cofont icon-business-logo rule-info-icon-unAuthed" />
        </view>
        <!-- done: 更换为企业认证信息栏，包括所属组织和认证状态；或组织、认证状态和创建人 -->
        <view slot="desc" class="{{ruleInfo.codeViewOnly ? 'rule-info-desc-adjust' : ''}}">
          <view wx:if="{{ruleInfo.codeViewOnly}}">
            <view class="rule-info-orgName" style="font-size:{{ruleInfo.fontSizeMsg.fontSize22}}">{{ruleInfo.orgName}}</view>
            <view wx:if="{{ruleInfo.orgAuthed}}" class="rule-info-authRow" style="font-size:{{ruleInfo.fontSizeMsg.fontSize12}}">
              <text class="clifont anticon-yirenzheng rule-info-icon-authed"></text>已认证</view>
            <view wx:else class="rule-info-authRow" style="font-size:{{ruleInfo.fontSizeMsg.fontSize12}}">
              <view style="white-space:nowrap;flex:none;">未认证</view>
              <block wx:if="{{ruleInfo.orgFounder}}">
                <text class="rule-info-mx-8" style="white-space:nowrap;flex:none;">|</text>
                <view
                  style="max-width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"
                >
                  创建人：{{ruleInfo.orgFounder}}
                </view>
              </block>
            </view>
          </view>
          <!-- <text wx:else class="weui-cell_link" bindtap="ruleInfoDescLink">权限说明</text> -->
          <!-- pdf导出受限提示 -->
          <text wx:elif="{{ruleInfo.info.originData.operateType === 'exportLimit'}}" class="weui-cell_link" bindtap="ruleInfoDescLink" style="font-size:{{ruleInfo.fontSizeMsg.fontSize14}}">导出说明</text>
          <text wx:else class="weui-cell_link" bindtap="{{(abnormalStatus == 9 || abnormalStatus == 8) ? 'navigateToBlog' : 'ruleInfoDescLink'}}" style="font-size:{{ruleInfo.fontSizeMsg.fontSize15}}">{{ruleInfo.info.originData.operateType === 'export' || ruleInfo.info.originData.operateType === 'subscribe' || ruleInfo.info.originData.operateType === 'exportPdf' || ruleInfo.info.originData.operateType === 'locationLimit' ? '功能' : '权限'}}说明</text>
        </view>
        <view slot="extend" class="weui-msg__custom-area">
          <view class="weui-form-preview__list" style="font-size:{{ruleInfo.fontSizeMsg.fontSize14}}">
            <!-- done: list项目中, 码名称项不变, 权限规则描述不变？整合：上面的权限说明按钮 -->
            <view wx:for="{{ruleInfo.infoList}}" role="option" class="weui-form-preview__item" hidden="{{item.hidden}}">
              <label class="weui-form-preview__label">{{item.label}}</label>
              <view class="weui-form-preview__value">
                <block wx:if="{{item.valueText}}">{{item.valueText}}</block>
                <text
                  wx:else
                  class="cliLink"
                  data-address="{{item.address}}"
                  data-longitude="{{item.longitude}}"
                  data-latitude="{{item.latitude}}"
                  bindtap="ruleInfoOpenAddress"
                >{{item.address}}{{item.radiusText}}</text>
              </view>
            </view>
          </view>
        </view>
        <view slot="handle">
          <button class="weui-btn weui-btn_primary" style="background:{{ruleInfo.info.theme}}" bindtap="ruleInfoConfirm" wx:if="{{ ruleInfo.info.page.showMainBtn }}" >{{ ruleInfo.codeViewOnly ? '申请查看' : ruleInfo.info.page.mainBtn }}</button>
          <button class="weui-btn weui-btn_{{ruleInfo.info.page.subBtnType}}" style="{{ruleInfo.info.page.subBtnType === 'default' ? 'color' : 'background'}}:{{ruleInfo.info.theme}}" bindtap="ruleInfoBack" wx:if="{{ ruleInfo.info.page.showSubBtn }}">{{ ruleInfo.info.page.subBtn }}</button>
          <navigator class="weui-btn weui-btn_{{ruleInfo.info.page.exitBtnType}}" style="{{ruleInfo.info.page.exitBtnType === 'default' ? 'color' : 'background'}}:{{ruleInfo.info.theme}}" target="miniProgram" open-type="exit" wx:if="{{ ruleInfo.info.page.showExitBtn }}">{{ ruleInfo.info.page.exitBtn }}</navigator>
          <button class="weui-btn weui-btn_default" style="color:{{ruleInfo.info.theme}}" bindtap="ruleInfoGoWebview" wx:if="{{ ruleInfo.info.page.showContactBtn }}">{{ ruleInfo.info.page.contactBtn }}</button>
        </view>
        <view wx:if="{{(abnormalStatus == 9 || abnormalStatus == 8) && showSkipLimitInfo}}" slot="tips">
          <view class="{{show_powered_by && !isIphoneX ? 'mb32' : ''}}">
            {{skipLimitInfo.showText}}，<text class="cliLink" catch:tap="skipAuthLimit">继续访问</text>
          </view>
          <render-trigger bind:renderCall="logOnUserCanSkipLimit" />
        </view>
        <!-- 扫码位置、时间不符合要求  -->
        <view slot="footer" class="rule-info-footer" wx:if="{{show_powered_by}}">
          <powerby />
        </view>
      </mp-msg>
    </view>
  </view>
  <view
    wx:if="{{abnormalStatus === 10 && !cardsLoading}}"
    class="empty-code"
    style="margin-top:{{isIphoneX ? '182px' : '152px'}}"
  >
    <image
      class="empty-image"
      src="https://static.clewm.net/cli/images/mina-cli/mina_code_empty@2x.png"
    />
    <view class="deleted-tips">当前码暂无可展示内容</view>
  </view>
  <view
    wx:if="{{abnormalStatus === 11 && customColor && !cardsLoading}}"
    class="empty-code"
    style="margin-top:{{isIphoneX ? '182px' : '152px'}}"
  >
    <image
      class="authed-image"
      src="https://static.clewm.net/cli/images/mina-cli/mina_need_auth@2x.png"
    />
    <view class="deleted-tips" style="white-space: pre-line;line-height: 22px;">该二维码中暂无内容，制作者已开启手机端编辑功能\n请授权手机号，验证是否有编辑权限</view>
    <button
      class="authed-btn"
      bindtap="goAuthPage"
      style="background: {{customColor == '#fff' || customColor == '#FFFFFF' ? '#365f93' : customColor}}"
    >
      授权
    </button>
  </view>
  <!-- 空模块无内容 -->
  <block wx:if="{{(abnormalStatus == 6 || abnormalStatus == 7 || abnormalStatus === 8 || abnormalStatus === 10 || abnormalStatus === 11) && show_powered_by == 1}}">
    <view class="fixed-bottom" style="bottom: {{isIphoneX ? '34px' : '24px'}}">
      <block wx:if="{{ hasData && preData.codeColorInfo && (!utils.hasContent(dataSize, hasPreData) || isListRenderComplete)}}">
        <template is="powerBy" data="{{ isLight:true, powerbyVersion, isWarnCode, lang, bottomColor, isChinese, isSkyline, powerbyAbVersion }}"></template>
      </block>
    </view>
  </block>
  <!-- 内部使用工具 -->
  <view class="cliUser" wx:if="{{cliUser}}">
    <view class="cliUserPrev" data-type="prev" bindtap="cliUser">上一个</view>
    <view class="cliUserNext" data-type="next" bindtap="cliUser">下一个</view>
  </view>

  <!--<root-portal>-->
  <!-- wx:if="{{(isRecordCode && recordAddStatus == 0 && expandLog === 2 && !isEdit && !cardsLoading && msgIntial)}}" -->
  <view
    id="codeFixedBottomContainer"
    wx:if="{{fixedBottomComponentList.length || (showBottomHomepage && formIsReady && !isOrgDestQrcode)}}"
    class="{{utils.getFixedBottomContainerClass(isRecordCode, recordAddStatus, expandLog, isEdit, cardsLoading, msgIntial, operateMsg, showMsg, tplId, caseId, isEditor, soncodeEditPosition, enableEditMode)}} bottom-fix-shadow"
  >
    <!-- 底部悬浮组件 -->
    <block wx:for="{{fixedBottomComponentList}}" wx:for-item="component">
      <block wx:if="{{component.component_code === 'contactus'}}">
        <contactPreview
          isFixed="{{!utils.formListEntryIsStatic(showMsg, tplId, caseId, isEditor, soncodeEditPosition, enableEditMode)}}"
          isInFixedContainer
          dataObj="{{component.attribute_list}}"
          orgMsg="{{orgMsg}}"
          customColor="{{customColor}}"
          isDarkBgColor="{{isDarkBgColor}}"
        />
      </block>
    </block>

    <block wx:if="{{showBottomHomepage && formIsReady && !isOrgDestQrcode}}">
      <view id="bottomHomepagePreview" bind:tap="gotoHomePage">
        <bottomHomepagePreview
          wx:if="{{!utils.showExpandBtn(isRecordCode, recordAddStatus, expandLog, isEdit, cardsLoading, msgIntial, operateMsg)}}"
          logoPath="{{logoPath}}"
          orgName="{{orgName}}"
          homePageUrl="{{homePageUrl}}"
          blackReturn="{{utils.getBlackReturn(preData, newPreData)}}"
          isSummaryCode="{{isSummaryCode}}"
        />
      </view>
    </block>

  </view>
  <view
    id="codeFixedBottomContainerPlaceholder"
    class="codeFixedBottomContainerPlaceholder"
    style="height: {{fixedFooterContainerPlaceholderHeight}}px;"
  >
  </view>
  <view
    wx:if="{{utils.showExpandBtn(isRecordCode, recordAddStatus, expandLog, isEdit, cardsLoading, msgIntial, operateMsg)}}"
    class="formListEntry {{utils.formListEntryIsStatic(showMsg, tplId, caseId, isEditor, soncodeEditPosition, enableEditMode) ? 'x-static;' : ''}}{{isOperateBtnBgTransparent ? 'transparent' : ''}}"
    style="{{overIphoneX ? '' : 'padding-bottom: 12px;'}}"
    data-flag="fixed-form-entry"
  >
    <view bind:tap="gotoHomePage" id="bottomHomepageIcon"  wx:if="{{showBottomHomepage && !isOrgDestQrcode}}" class="homepage-icon">
      <text
        class="{{utils.getExpandBtnHoverClass(preData, newPreData, expBtnColor) === 'blackBg' ? 'black' : 'white'}} icon clifont anticon-home home-icon-font"
      >
      </text>
      <text class="{{utils.getExpandBtnHoverClass(preData, newPreData, expBtnColor) === 'blackBg' ? 'black' : 'white'}} homepage-font">主页</text>
    </view>
    <view
      bindtap="goFormList"
      style="{{!(showBottomHomepage && !isOrgDestQrcode) ? 'padding:0 70px;width:240px;' : ''}}"
      class="formListEntryWrap"
    >
      <view class="formListEntryBg fixedBottomBtn {{isOperateBtnBgTransparent ? 'transparent' : ''}}" />
      <view
        class="title"
        style="{{utils.getExpandBtnStyle(preData, newPreData, expBtnColor, expBtnBg, isBgImgMode, isCodeEmpty, showMsg, tplId, caseId, isEditor, soncodeEditPosition, enableEditMode, isColorExtend)}}{{!showBottomHomepage ? 'width: 240px;' : ''}}"
        hover-class="{{utils.getExpandBtnHoverClass(preData, newPreData, expBtnColor)}}"
      >
        {{  recordMsg.expand_btn || '填写表单'}}
      </view>
    </view>
  </view>
  <view
    wx:if="{{utils.isInEditMode(isEditor, soncodeEditPosition, enableEditMode)}}"
    class="formListEntry createCodeBtnWrapper tplOperWrapper edit-mode-btn-wrapper {{!isUserTpl ? 'is-case-tpl' : ''}}"
    style="{{overIphoneX ? '' : 'padding-bottom: 12px;'}}{{showMsg ? 'z-index: 100002' : ''}}"
  >
    <view class="formListEntryBg" style="background:rgba(250,250,250,0.95);" />
    <view
      wx:if="{{tplId && isUserTpl && !isFromCaseTplCoded}}"
      class="createCodeTip"
      style="margin-top:6px;margin-bottom:16px;font-size:13px;color:rgba(0,0,0,0.65);"
    >
      <!--<view class="createCodeTipText">{{isUserTpl ? '如需修改模板，批量生码，可前往电脑端操作' : '修改其他内容，需在电脑端修改该批量模板'}}</view>
      <view class="createCodeTipLink" bindtap="viewTips" style="margin-left:6px;color:#576b95;">了解详情</view>-->
      <view class="createCodeTipText">
        如需修改模板，批量生码，可前往电脑端操作
      </view>
    </view>
    <view
      wx:if="{{tplId && tplEnableEditMode && (!isUserTpl || isFromCaseTplCoded)}}"
      class="createCodeTipForLeft"
    >
      <view class="createCodeTipText">点击页面的修改替换内容，生成二维码</view>
      <view class="createCodeTipText">修改其他内容、批量生码可前往电脑端后台操作</view>
    </view>

    <view class="tplOperBtnGroup {{systemClass}}">
      <view
        class="tplBtnPrimary edit-mode-btn"
        style="margin-left: 0;"
        bindtap="saveByEditMode"
      >
        {{tplId ? (isUserTpl ? '生成二维码' : '保存批量模板，并生成二维码') : '保存并退出编辑模式'}}
        <data-observer data="{{null}}" bind:change="onEditModeBtnVisible" />
      </view>
    </view>
  </view>
  <view
    wx:elif="{{((tplId && !tplEnableEditMode) || caseId) && !showAddTpl && !showMoreActionModal}}"
    class="formListEntry createCodeBtnWrapper {{ tplId ? 'tplOperWrapper' : '' }}"
    style="{{overIphoneX ? '' : 'padding-bottom: 12px;'}}{{showMsg ? 'z-index: 100002' : ''}}"
  >
    <view class="formListEntryBg" style="background:rgba(250,250,250,{{caseId ? 1 : 0.95}});" />
    <view
      wx:if="{{isBatchCode && !tplId}}"
      class="createCodeTip"
    >
      <view class="createCodeTipText">如需批量生成二维码，可前往电脑端制作，</view>
      <view class="createCodeTipLink" bindtap="handleBatchLinkClick">查看指南</view>
    </view>
    <view
      wx:elif="{{!tplId}}"
      class="createCodeTip"
    >
      <view class="createCodeTipText">如需修改模板内容，可前往电脑端制作，</view>
      <view class="createCodeTipLink" bindtap="handleTipLinkClick">查看指南</view>
    </view>

    <view
      wx:if="{{tplId && !tplEnableEditMode && isUserTpl}}"
      class="createCodeTipForLeft"
    >
      <block
        wx:if="{{(isUserTpl === 'false') || (isUserTpl === false)}}"
      >
        <view class="createCodeTipText">保存模板后可修改字段信息，在手机上生一个码试试</view>
        <view class="createCodeTipText">修改其他内容、批量生码可前往电脑端后台操作</view>
      </block>
      <block
        wx:else
      >
        <view class="createCodeTipText">黄色区块是可在手机端修改的部分，生码时，将具体内容填入其中即可。</view>
        <view class="createCodeTipText">修改其他内容、批量生码可前往电脑端后台操作</view>
      </block>
    </view>
    <view
      wx:if="{{tplId}}"
      class="tplOperBtnGroup {{systemClass}}"
    >
      <view
        class="tplBtnDefault"
        bindtap="handleGoToTplDetail"
        style="line-height: {{ isAndroid ? '48px' : '48px' }}"
        wx:if="{{noTplDesc == 0}}"
      >
        模板介绍
      </view>
      <view
        wx:if="{{!isUserTpl && sceneKey !== 'createTab'}}"
        class="tplBtnPrimary {{ addtoMyTplLoading ? 'disabledBtn' : '' }}"
        style="{{noTplDesc == 0 ? '' : 'margin-left: 0'}};line-height: {{ isAndroid ? '48px' : '48px' }};"
        bindtap="addToMyTplTips"
      >
        添加模板生码
      </view>
      <!-- TODO 这样写是否有问题 -->
      <view
        wx:elif="{{isCaseTplPreview}}"
        class="tplBtnPrimary"
        style="margin-left: 0;"
        bind:tap="nextToSaveCaseTmpl"
      >
        保存批量模板去生码
      </view>
      <view
        wx:else
        class="tplBtnPrimary"
        style="{{noTplDesc == 0 ? '' : 'margin-left: 0'}}"
        bindtap="handleBuildCodeByTpl"
      >
        使用模板生码
      </view>
    </view>
    <button
      wx:else
      open-type="{{ accreditOrNot ? '' : 'getPhoneNumber' }}"
      bindgetphonenumber="authCreateCode"
      data-case-id="{{caseId}}"
      class="title createCodeBtn"
      bindtap="createCodeByCase"
    >
      使用模板生成二维码
    </button>
  </view>
  <!--</root-portal>-->

  <view
    wx:if="{{tplId && utils.isInEditMode(isEditor, soncodeEditPosition, enableEditMode)}}"
    class="form-list-entry-placeholder"
    style="height:{{overIphoneX ? '128px;' : '114px;'}} width: 100%;"
  />
  <view
    wx:elif="{{tplId || utils.isInEditMode(isEditor, soncodeEditPosition, enableEditMode)}}"
    class="form-list-entry-placeholder"
    style="height:{{overIphoneX ? '86px;' : '72px;'}} width: 100%;"
  />
  <view
    wx:elif="{{caseId}}"
    class="form-list-entry-placeholder"
    style="height:{{overIphoneX ? '121px;' : '107px;'}} width: 100%;"
  />
  <block
    wx:elif="{{isRecordCode && recordAddStatus == 0 && expandLog === 2 && !isEdit && operateMsg.length}}"
  >
    <block wx:if="{{showMsgList}}">
      <view
        wx:if="{{!showMsg}}"
        class="form-list-entry-placeholder"
        style="height:92px;width:100%;"
      />
    </block>
    <view
      wx:else
      class="form-list-entry-placeholder"
      style="height:{{overIphoneX ? '86px;' : '72px;'}}width:100%;"
    />
  </block>

  <!--<view
    class="tpl-guide-footer-fixed"
    style="padding-bottom: {{isIphoneX ? '34px' : '0'}}"
    bindtap="useTplGuideTip"
    wx:if="{{ (pageFrom === 'yiqing_detail') && hasData }}"
  >
    <view class="guide-action">
      模板使用说明
    </view>
  </view>
  <view
    wx:if="{{ (pageFrom === 'yiqing_detail') && hasData }}"
    style="padding-bottom: {{isIphoneX ? '114px' : '80px'}}"
  />-->

  <modal
    show="{{showUseTplGuideModal}}"
    title="模板使用说明"
    confirmText="我知道了"
    showCancelBtn="{{false}}"
    height="{{0}}"
    bindclosed="onUseTplGuideModalClosed"
    isSkyline="{{isSkyline}}"
    useScrollView="{{!isSkyline}}"
  >
    <view
      style="padding: 0 24px; font-size: 14px; color: rgba(0, 0, 0, 0.65); text-align: center;"
    >
      请在电脑端使用模板创建，手机端暂不支持。电脑端可按需调整模板内容或样式
    </view>
    <view style="margin-top: 8px; text-align: center; color: rgba(0, 0, 0, 0.45);margin-bottom:32px;">
      输入cli.im 或百度搜索：草料二维码
    </view>
  </modal>

</view>
