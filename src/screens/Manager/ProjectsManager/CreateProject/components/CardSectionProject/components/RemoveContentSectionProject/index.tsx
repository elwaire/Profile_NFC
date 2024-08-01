import { DeleteOutlined } from "@ant-design/icons";
import { Button, FormInstance } from "antd";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { ProjectsActions } from "~/core/store";

type RemoveContentSectionProjectProps = {
    form: FormInstance<any>;
    sesstionKey: string;
    contentIndex: number;
};

const RemoveContentSectionProject: React.FC<RemoveContentSectionProjectProps> = ({
    form,
    sesstionKey,
    contentIndex,
}) => {
    const dispatch = useAppDispatch();
    const sections = useAppSelector((state) => state.root.projects.sections);

    const handleRemoveContent = (sectionKey: string, contentIndex: number) => {
        dispatch(
            ProjectsActions.update({
                sections: sections.map((section) =>
                    section.key === sectionKey
                        ? { ...section, contents: section.contents.filter((_, index) => index !== contentIndex) }
                        : section,
                ),
            }),
        );

        // reset form fields
        form.resetFields([`content-${sectionKey}-${contentIndex}`]);
    };

    return (
        <Button type="link" onClick={() => handleRemoveContent(sesstionKey, contentIndex)} icon={<DeleteOutlined />}>
            Remove
        </Button>
    );
};

export default memo(RemoveContentSectionProject);
