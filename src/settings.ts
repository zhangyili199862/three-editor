export type screenSetting = {
  webName: string;
  title: string;
  isWideScreen: boolean;
  isAccordingToResolution: boolean;
};

const settings: screenSetting = {
  /**
   * @type String
   *
   * 网页名称
   */
  webName: "大屏",
  /**
   * @type String
   *
   * 大屏名称
   **/
  title: "大屏",
  /**
   * @type Boolean
   *
   * 是否是宽屏 width 2560 3840 ...
   */
  isWideScreen: true,
  /**
   * @type Boolean
   *
   * 是否根据分辨率显示数据块
   */
  isAccordingToResolution: true,
};

export default settings;
