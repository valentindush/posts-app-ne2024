import TouchableButton from "@/components/CustomButton"
import CustomInput from "@/components/CustomInput"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import Header from "@/components/ui/Header"
import { Feather, Ionicons } from "@expo/vector-icons"
import { Formik, FormikHelpers } from "formik"
import twrnc from 'twrnc'
import RNTextArea from "@freakycoder/react-native-text-area";
import * as Yup from 'yup'
import axios from "@/utils/axios.config"
import { Alert } from "react-native"
import { router } from "expo-router"

interface FormValues {
    title: string;
    body: string;
}

const validationSchema = Yup.object().shape({
    title: Yup.string().min(3, "Title must be atleat 3 characters").max(200, "Title is too large. atmost 100 characters").required('title is required'),
    body: Yup.string().min(10, "Body must be atleast 10 characters").max(1000, "Body too long").required('body is required'),
});

const createPostPage = () => {

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        try {
            const res = await axios.post('/posts', {userId: 1, title: values.title, body: values.body})
            Alert.alert("Success", "Posted created")
            router.push('/')
        } catch (error: any) {
            Alert.alert("Error", "Something went wront" + error.message)
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <ThemedView style={twrnc`flex-1`}>
            <Header title="New post" />
            <ThemedView style={twrnc`px-6 mt-8`}>
                <ThemedText style={twrnc`text-lg font-semibold`}>Create a new post</ThemedText>

                {/* form */}
                <ThemedView style={twrnc`mt-4`}>
                    <Formik
                        initialValues={{ title: '', body: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                            <ThemedView style={twrnc`flex flex-col gap-6 w-full`}>
                               
                                <ThemedView style={twrnc`flex flex-col gap-3`}>
                                    <ThemedView>
                                        <CustomInput
                                            placeholder="Title"
                                            onChangeText={handleChange('title')}
                                            onBlur={handleBlur('title')}
                                            value={values.title}
                                        />
                                        {touched.title && errors.title && (
                                            <ThemedText style={twrnc`text-red-400 text-sm mt-1`}>{errors.title}</ThemedText>
                                        )}
                                    </ThemedView>
                                    <ThemedView>
                                        <RNTextArea
                                        maxCharLimit={1000}
                                            placeholder="Body"
                                            onChangeText={handleChange('body')}
                                            onBlur={handleBlur('body')}
                                            value={values.body}
                                            cursorColor={"gray"}
                                            style={twrnc`bg-gray-200 rounded-xl text-left`}
                                        />
                                        {touched.body && errors.body && (
                                            <ThemedText style={twrnc`text-red-400 text-sm mt-1`}>{errors.body}</ThemedText>
                                        )}
                                    </ThemedView>
                                </ThemedView>
                                <ThemedView>
                                    <TouchableButton
                                        title="Continue"
                                        onPress={() => handleSubmit()}
                                        disabled={isSubmitting}
                                        loading={isSubmitting}
                                    />
                                </ThemedView>
                            </ThemedView>
                        )}
                    </Formik>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    )
}

export default createPostPage