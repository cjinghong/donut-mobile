import { StyleService, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { color } from '../../theme'
import { Text } from '../text/text'

export interface BottomModalProps {
  visible: boolean;
  onDismiss: () => void;
  /// If provided, modal cannot be dismissed
  disableDismiss?: boolean;
}

const BottomModal: React.FC<BottomModalProps> = ({
  visible,
  onDismiss,
  children,
  disableDismiss,
}) => {
  const styles = useStyleSheet(styleService)

  return (
    <Modal
      avoidKeyboard
      useNativeDriverForBackdrop
      isVisible={visible}
      style={styles.modal}
      onBackdropPress={disableDismiss ? undefined : onDismiss}
      swipeDirection={disableDismiss ? undefined : 'down'}
      onSwipeComplete={disableDismiss ? undefined : onDismiss}
    >
      <SafeAreaView style={styles.bottomHalfContainer}>
        <View style={styles.topIndicator}/>
        {children}
      </SafeAreaView>
    </Modal>
  )
}

const styleService = StyleService.create({
  bottomHalfContainer: {
    alignItems: 'center',
    backgroundColor: color.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    display: 'flex',
    height: hp('90%'),
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  topIndicator: {
    backgroundColor: 'color-gray-500',
    width: 160,
    height: 6,
    borderRadius: 4,
    marginTop: 8
  }
})

export default BottomModal
