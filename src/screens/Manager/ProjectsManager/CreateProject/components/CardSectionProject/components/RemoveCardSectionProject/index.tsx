import { DeleteOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { ProjectsActions } from "~/core/store";

type RemoveCardSectionProjectProps = {
    keyCardSection: string;
};

const RemoveCardSectionProject: React.FC<RemoveCardSectionProjectProps> = ({ keyCardSection }) => {
    const dispatch = useAppDispatch();
    const sections = useAppSelector((state) => state.root.projects.sections);

    const handleRemoveSection = (key: string) => {
        dispatch(ProjectsActions.update({ sections: sections.filter((section) => section.key !== key) }));
    };

    return (
        <Space>
            {sections.length > 1 && (
                <Button type="link" onClick={() => handleRemoveSection(keyCardSection)} icon={<DeleteOutlined />}>
                    Remove
                </Button>
            )}
        </Space>
    );
};

export default memo(RemoveCardSectionProject);
