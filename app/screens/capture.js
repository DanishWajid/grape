"use strict";
import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { RNCamera } from "react-native-camera";
import ToggleButton from "../components/lib/toggle-button/ToggleButton";
import CaptureButton from "../components/lib/capture-button/CaptureButton";

export default class Capture extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flash: false,
      facing: "back",
      torch: "off",
      recording: false,
      video: null,
      picture: null
    };
    this.camera = null;
    this.captureButton = null;
  }

  switchFacing = () => {
    this.setState({ facing: this.state.facing == "back" ? "front" : "back" });
  };

  toggleFlash = () => {
    this.setState({ flash: !this.state.flash });
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { skipProcessing: true, fixOrientation: true };
      const response = await this.camera.takePictureAsync(options);

      this.props.navigation.navigate("Caption", { response, image: true });
    }
  };

  async startRecording() {
    this.setState({ recording: true });
    // default to mp4 for android as codec is not set
    const response = await this.camera.recordAsync();

    this.props.navigation.navigate("Caption", { response, image: false });
  }

  stopRecording() {
    this.camera.stopRecording();
    this.setState({ recording: false, torch: "off" });
  }

  renderCameraControls() {
    const overlay = this.state.picture != null || this.state.video != null;
    const hide = this.state.recording || overlay;

    const opacity = { opacity: hide == true ? 0 : 1 };
    const opacity2 = { opacity: overlay == true ? 0 : 1 };

    return (
      <View style={styles.bottomControls}>
        <ToggleButton
          disabled={hide}
          style={styles.iconButton}
          iconSize={34}
          color="#FFF"
          icon={"flash-off"}
          toggledIcon={"flash"}
          onPress={this.toggleFlash.bind(this)}
        />
        <CaptureButton
          style={opacity2}
          disabled={overlay}
          ref={ref => {
            this.captureButton = ref;
          }}
          onTimerEnd={this.stopRecording.bind(this)}
          onLongPressOut={this.stopRecording.bind(this)}
          onLongPressIn={this.startRecording.bind(this)}
          onPressOut={this.takePicture.bind(this)}
        />
        {this.renderRightCameraControl(hide, opacity)}
      </View>
    );
  }

  renderCamera() {
    const { flash, recording } = this.state;
    return (
      <RNCamera
        ref={cam => {
          this.camera = cam;
        }}
        style={styles.preview}
        type={this.state.facing}
        torchMode={this.state.torch}
        captureAudio={true}
        orientation="portrait"
        flashMode={
          flash
            ? recording
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.on
            : RNCamera.Constants.FlashMode.off
        }
        captureQuality={"1080p"}
        captureMode={"video"}
        playSoundOnCapture={false}
      />
    );
  }

  renderRightCameraControl(hide, opacity) {
    return (
      <ToggleButton
        disabled={hide}
        style={styles.iconButton}
        iconSize={34}
        color="#FFF"
        icon={"camera-party-mode"}
        toggledIcon={"emoticon-tongue"}
        forceDefault={this.state.facing == "front"}
        onPress={this.switchFacing.bind(this)}
      />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderCamera()}
        <View style={styles.uiContainer}>{this.renderCameraControls()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "#000"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  uiContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    zIndex: 0
  },
  mcManager: {
    flex: 0.15,
    width: "100%"
  },
  bottomControls: {
    flex: 0.23,
    paddingBottom: "8%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  iconButton: {
    height: 50,
    width: 50
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    width: "100%",
    height: "100%"
  },
  camera: {
    flex: 1
  }
});
